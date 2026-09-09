//自定义类型对象 接口
//面向对象核心概念

interface Todo{
    id:string,
    title:string,
    completed:boolean,
    createdAt:Date
}

const todos:Todo[] = [
    {
        id:"1",
        title:'吃饭',
        completed:true,
        createdAt:new Date()
    },
     {
        id:"2",
        title:'睡觉',
        completed:true,
        createdAt:new Date()
    }

];

const p = Bun.serve({
    port:8080,
    async fetch(req){
        const headers =   {'Access-Control-Allow-Origin': '*'}
        console.log(req);
        const url = new URL(req.url);
        const pathname = url.pathname.split('/');
        const id = pathname[2];
        if (pathname[1] === 'todos') {
             const todo = todos.find(item => 
                item.id === id
            );
            return Response.json(todo , {
                headers
            });
        }else{
            return Response.json(todos, {
                headers
            });
        }
        return Response.json({mesg:"欢迎来到bun创建的服务器"});

    }

});