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
