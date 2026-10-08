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
    const isMath = /[+\-*]/.text(state.query)
}


