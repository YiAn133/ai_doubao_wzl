// 中间件
import "dotenv/config"
import{z} from 'zod'
import {ChatOpenAI} from '@langchain/openai'
import{
    createAgent,
    createMiddleware,HumanMessage,
    AIMessage
} from 'langchain'

