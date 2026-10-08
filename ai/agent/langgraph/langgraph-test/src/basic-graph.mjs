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
