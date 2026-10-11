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

