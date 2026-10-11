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

