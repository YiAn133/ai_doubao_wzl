"use client";
//组件在前端渲染的标记，表示这个组件在客户端执行
// 如果不加 默认是在服务端执行

import{
    useState,
    useEffect
}from 'react'

import { Todo } from './type';
import { log } from 'console';

export default function TodosPage(){
    const [todos , setTodos] = useState<Todo[]>([]);
    const [text , setText] = useState<string>("");
    

    const fetchTodos = async () => {
        // 可以用axios
        // 实例化，然后axios设置baseURL，避免跨域问题，然后导入，用get方法
        const res = await fetch("/api/todos",{
            cache:"no-store"
        });
        // res.json():1.读取二进制响应报文的body  2.将body进行JSON.parse() 得到js对象
        const data:Todo[] = await res.json();
        setTodos(data);
        
    }


    useEffect(() => {
        fetchTodos();
    },[]);
    const handleAdd = async() => {
        if(!text.trim()){
            return 
        }
        await fetch('/api/todos' , {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title:text})
        })
        await fetch('/api/todos');
        setText("");
    }


    return(
        <div>
            <h1>待办事项</h1>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='请输入新的待办任务'/>
        <ul style={{paddingLeft:"0" , listStyle:"none"}}>
            <button onClick={handleAdd} style={{marginLeft:"10px"}}>添加</button>
            {
                todos.map((item ) => {
                   return (
                   <li key={item.id} style={{margin:"8px 0" , display:"flex" , gap:"10px"}}>
                    <span style={{textDecoration:item.completed ? "line-through" : "none" , cursor:"pointer"}}>
                        {item.title}
                        </span>
                    <button>删除</button>
                    </li>
                )
                })
            }
        </ul>
        </div>
    )
}