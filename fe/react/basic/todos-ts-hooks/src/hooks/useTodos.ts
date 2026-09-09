import{
    useState
} from 'react';

import type{
    Todo,FilterType
}from '../types/todo';

export function useTodos() {
    const [todos , setTodos] = useState<Todo[]>([]);

    const [filter , setFilter] = useState<FilterType>('all')

    const addTodo = (text:string) => {
        if(!text.trim()){
            return;
        }
        // 注意：学到一个知识如果箭头函数后面是花括号，里面写了id：会被认为是标签，不会被认为是对象，必须外面套了({id:1})
        const newTodo:Todo  = {
            id:Date.now().toString(),
            text:text.trim(),
            completed:false
        }
        // 新知识：函数式更新，传递的是函数
        setTodos(prev => [...prev,newTodo])
    }
    // 切换状态
    const toggleTodo = (id:string) => {
        setTodos(prev => 
            prev.map(item => item.id === id ?{...item, completed: !item.completed} : item))
    }
    // 完成任务
    const deletodo = (id:string) => {
        setTodos(prev => prev.filter(item => item.id !== id))
    } 
    //清除任务
    const clearCompleted = () => {
        setTodos(prev => prev.filter(item => !item.completed))
    }
    // 
    const filteredTodos = () => {

    }

    return {
        todos,
        filter,
        addTodo,
        toggleTodo,
        deletodo,
        clearCompleted
    }

}