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

