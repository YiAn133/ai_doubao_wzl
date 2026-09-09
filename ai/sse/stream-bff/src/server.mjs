import * as dotenv from 'dotenv';
//b把apikey放入BFF层小后端，别人看不到，更安全
// fetch -> bff(apiKey) ->
dotenv.config({
    path:['.env.local','.env']
});
// 快速创建一个http服务器
//明明有了vite为什么还要创建一个http服务器
// 因为vite创建的端口，是服务器于前端的
// 这里创建的端口是服务于后端的
// 思路：vite（5173端口）-> BFF（3000端口）-> llm
// 这里可以让前端简洁，并且用BFF来完成复杂业务
import express from 'express';
// 轻量的后端，就这一个文件
//num run dev 是跑前端的
//node server.mjs 运行后端进程
const app = express();
const port = 3000;
app.listen(port , () => {
    console.log(`服务器在${port}端口启动了`);
    
})
// 流式输出
app.get('/stream', async(req , res) => {
   const { prompt } = req.query;
   const endpoint = 'https://api.deepseek.com/v1/chat/completions';
   try{
    const response = await fetch(endpoint,
        {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
            },
            body:JSON.stringify({
                model:'deepseek-v4-flash',
                stream:true,
                messages:[{role:'user',content:prompt}]
            })
        } 
    )
     console.log(response.body);
   }catch(err){

   }
});













console.log(process.env.VITE_DEEPSEEK_API_KEY);

console.log('我是一个在前端的后端');
