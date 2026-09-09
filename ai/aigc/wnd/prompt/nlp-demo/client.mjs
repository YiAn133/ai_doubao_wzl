import { OpenAI } from "openai";
import dotenv from 'dotenv'
//加载环境变量
dotenv.config();
export const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_API_BASE_URL
})