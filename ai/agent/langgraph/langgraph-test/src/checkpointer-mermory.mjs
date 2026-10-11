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