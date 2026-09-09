// 全栈开发中api目录下的表示 后端接口，专门返回JSON数据的

import { log } from 'node:console';
import {Todo} from '../../todos/type';

let todos:Todo[] = [
    {id:1 , title:'学习AppRouter' , completed:true},
     {id:2 , title:'学习next,js 个人官网开发' , completed:false},
]

//  /api/todos 中的get请求
export async function GET() {
    // 返回json 数据接口 
    return Response.json(todos);
}

export async function POST(req:Request) {
    const body = await req.json();
    const newTodo:Todo = {
        id:+Date.now(),
        title:body.title,
        completed:false
    }
    todos.push(newTodo);
    return Response.json(newTodo);
}

