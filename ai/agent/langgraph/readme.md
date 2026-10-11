# Langgraph
LangGraph 是 LangChain 团队开发的**有状态 Agent 编排框架**，用来把大模型、工具、业务逻辑组织成带循环、分支的图工作流，专门做复杂智能体任务

## 为什么需要多Agent
复杂的Agent产品基本都是多Agent 架构。
- langchain 工作流是线性的
- langchain 工作流是网状的

单Agent架构下，所有的tool描述，每个功能的prompt 都放在system prompt里
但每次上下文都会带上，token消耗更多，会造成上下文开销大

- 如何拆分多Agent？
每个Agent 只保留需要的Prompt, 执行功能的时候， 消耗的token 更少，没有
  无关信息干扰， 准确率更高。

Agent = LLM(大脑) + Harness(tool+mcp+rag+skill.. +...)
单Agent 只有一个llm 大脑  需要一步步思考， 调用tool 
规划 
多Agent  多个大脑， 并行思考 
主Agent 下发任务， 子Agent 并行处理完成后返回
每个大脑需要选择适合的模型
agent组合式， 按需加载，动态加载
多agent分工合作， 编程agent 负责写代码， 让测试agent 编写测试代码TDD， 
让 验证Agent 验证代码是否符合预期。 告诉主Agent 通过了。

基于三个原因

- 决策准确率高，token 消耗更低。 
每个Agent 只要带必要的最少Prompt, 没有冗余信息干扰。 
调用llm 次数多，但更省token。
- 并行思考和任务处理 
  主管分派子任务， 子Agent并行处理， 整体效率更高
- 多角色互相讨论， 纠错能力更强。 AutoGen  法庭


## langchain -> Langgraph
- llm api, document loaders, splitter, embedding, vector store, output parser
  memory... 基础模块 
- langchain 线性工作流编排
- langgraph 网状工作流编排  
- 工作节点 + 组织方式（api）
- 简单Agent -> 复杂多Agent协作 

## 网状工作流编排 API
- 开始节点
    初始状态
- 工作节点
    职责 状态state
- 连接工作节点
    边
- 工作节点
    最终状态



## 使用：安装了三个包@langchain/langgraph @langchain/core @langchain/openai

import {
    Annotation,//定义共享数据长什么样子的，更新怎么合并
    END,
    START,
    StateGraph//工作流蓝图构建器
}from '@langchain/langgraph'

const StateAnnotation = Annotation.Root({
    text:Annotation({//定义text字段
        default:() => "",//默认值
        reducer:(_prev , next) => next//定义旧值和新值如何改变，这里是之间覆盖
    })
})

// 函数就是节点
// 这里在模拟 旧状态被转为了新状态
const step1 = (state) => ({text:`${state.text} -> step1`})

const step2 = (state) => ({text:`${state.text} -> step2`})
// 实例化图工作流
const graph = new StateGraph(StateAnnotation).addNode("step1",step1).addNode("step2" , step2).addEdge(START,"step1").addEdge("step1","step2").addEdge("step2",END).compile()

// 变成可视化的图
const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({withStyles:true})
console.log(mermaid);

const result = await graph.invoke({text:"hello"})

console.log(result);




## 分支 循环
分析了下 如何进行分支 和 循环
import {
    Annotation,//定义共享数据长什么样子的，更新怎么合并
    END,
    START,
    StateGraph//工作流蓝图构建器
}from '@langchain/langgraph'

const StateAnnotation = Annotation.Root({
    query:Annotation({//定义text字段
        default:() => "",//默认值
        reducer:(_prev , next) => next//定义旧值和新值如何改变，这里是之间覆盖
    }),

    route:Annotation({
        reducer:(_prev , next) => next
        ,default:() => "chat"
    }),
    answer:Annotation({
        reducer:(_prev,next) => next,
        default:() => ""
    })
})

// 节点申明
const router = (state) => {
    const isMath = /[+\-*]/.test(state.query)

    return {route:isMath ? "math" : "chat"}
}

const mathNode = (state) => {
    try {
        return{ answer : String(eval(state.query)) }
    } catch (error) {
        return {answer:"表达式无法计算"}
    }
}

const chatNode = (state) => {
    return {answer:`你说的是${state}`}
}

const graph = new StateGraph(StateAnnotation).
addNode("router",router).
addNode("math",mathNode).
addNode("chat",chatNode).
addEdge(START,"router").
addConditionalEdges("router",(state) => state.route , {math:'math',chat:'chat'}).
addEdge("math",END).
addEdge("chat",END).compile()

const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({withStyles:true})

console.log(mermaid);

console.log("result",await graph.invoke({query:"1+2"}));



import {
    Annotation,//定义共享数据长什么样子的，更新怎么合并
    END,
    START,
    StateGraph//工作流蓝图构建器
}from '@langchain/langgraph'

const StateAnnotation = Annotation.Root({
    tries:Annotation({
        reducer:(_perv,next) => next,
        default: () => 0
    }),
    ok:Annotation({
        reducer:(_prev,next) => next,
        default: () => false
    }),
    message:Annotation({
        reducer:(_prev,next) => next,
        default: () => ''
    })
})
 
const attempt = (state) => {
    const tries = state.tries + 1;
    const ok = tries >= 3;
    return {
        tries,
        ok,
        message:ok ? `第${tries}次成功` : `第${tries}次成功`
    }
}
const graph = new StateGraph(StateAnnotation).addNode("attempt" , attempt).addEdge(START,"attempt").
addConditionalEdges("attempt",(state) =>state.ok  ? "done":"retry",{
    retry:"attempt",
    done:END
}).compile()

const drawable = await graph.getGraphAsync()

const mermaid = drawable.drawMermaid({withStyles:true})

console.log(mermaid);

console.log('result:',await graph.invoke({tries:0}));


## 持久化我们的状态？

用MemorySaver 来把state 保存到内存中 可以保存上一次运行的状态
import {
    Annotation,//定义共享数据长什么样子的，更新怎么合并
    END,
    MemorySaver,
    START,
    StateGraph,//工作流蓝图构建器,
   
}from '@langchain/langgraph'

const StateAnnotation = Annotation.Root({
    visitCount:Annotation({
        reducer:(_prev,next) => next,
        default:() => 0
    }),
    message:Annotation({
        reducer:(_prev,next) => next,
        default:() => ''
    })
})

function recordVisit(state){
    const visitCount = state.visitCount + 1;

    const message =  `这是你第${visitCount}次进入会话`

    return{
        visitCount,
        message
    }
}

const graph = new StateGraph(StateAnnotation).
addNode("recordVisit",recordVisit).
addEdge(START,"recordVisit").
addEdge("recordVisit",END);

const checkpointer = new MemorySaver();//内存保存器

const App = graph.compile({
    checkpointer
})

const user1 = {configurable : {thread_id:"用户_小张"}}

const user2 = {configurable : {thread_id:"用户_小王"}}

const res1 = await App.invoke({} , user1)
console.log(res1);

const res2 = await App.invoke({} , user2)
console.log(res2);

const res3 = await App.invoke({} , user1)
console.log(res3);

const res4 = await App.invoke({} , user2)
console.log(res4);

const res5 = await App.invoke({} , user1)
console.log(res5);

## harness 中断,恢复
用到了interrupt():执行到这一行，**图直接暂停，退出本次 invoke**；等待外部人工输入，下一次用同一个 `thread_id` 调用 `app.stream/invoke` 恢复执行，`interrupt()` 的返回值就是你传入的人工输入。
还要command专门恢复中断的
// 演示的是 模拟 Agent在向用户请求权限的时候，如何记住上一次的状态
import {
    Annotation,Command,//定义共享数据长什么样子的，更新怎么合并
    END,
    interrupt,
    MemorySaver,
    START,
    StateGraph//工作流蓝图构建器
}from '@langchain/langgraph'

import { createInterface } from "readline/promises";

const StateAnnotation =  Annotation.Root({
    actionSummary:Annotation({
        reducer:(_prev,next) => next,
        default:() => ''
    }),
    useInput:Annotation({
        reducer:(_prev , next) => next,
        default:() => ''
    })
})

// 节点
const showTransfer = () => {
    return{actionSummary: "向张三转钱 100块"}
}

const waitConfirm = (state) => {
    const text = interrupt({//中断,langgraph中特有的
        hint:"终端里输入[确认]或者备注后回车",
        actionSummary:state.actionSummary
    })
    return {useInput:String(text)}
}


const graph = new StateGraph(StateAnnotation).addNode("showTransfer", showTransfer)
  .addNode("waitConfirm", waitConfirm)
  .addEdge(START, "showTransfer")
  .addEdge("showTransfer", "waitConfirm")
  .addEdge("waitConfirm", END)
  .compile({checkpointer:new MemorySaver()})

const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({ withStyles: true });
console.log(mermaid);

const config = {configurable : {thread_id : "user1"}}

const paused = await graph.invoke({},config)

console.log("待确认",paused.__interrupt__?.[0]?.value);

const rl = createInterface({
    input:process.stdin,
    output:process.stdout
})

const line = (await rl.question(">")).trim();

console.log("你输入了",line);

rl.close();

const done = await graph.invoke( new Command({resume:line}), config);

console.log(done);