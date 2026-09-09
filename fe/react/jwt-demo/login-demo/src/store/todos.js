// zustand 一般用于大型项目
// compoents 那样的写法适用于 中小型
import {
    create
} from 'zustand';
// create 是一个高阶函数， 接收一个函数作为参数
// 返回值也是函数
export const useTodosStore = create(set => ({
    todos:[],
    // actions
    setTodos:({todos}) => {
        set({
            todos
        })
    }
}));