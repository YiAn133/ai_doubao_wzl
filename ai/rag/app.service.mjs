import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();


// app.service.mjs 大型项目的风骨 app 应用  service获取llm服务
export const client = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})
