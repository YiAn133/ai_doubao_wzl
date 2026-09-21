import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import{
    //InMemoryChatMessageHistory, //短期内存记忆
    FileSystemChatMessageHistory //文件记忆
}from '@langchain/community/stores/message/file_system'

import{
    HumanMessage , SystemMessage,
    AIMessage
}from '@langchain/core/messages'

import path from 'node:path'
import { error, log } from 'node:console'

const model = new ChatOpenAI({
    model: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
    temperature: 0
})

async function fileHistoryDemo() {
    // Promise 类上的静态方法
    const filePath = path.join(process.cwd() , "chat_history.json");
    const sessionId = "user_session_001";
    const systemMessage = new SystemMessage("你是一个友好，幽默的做菜助手，喜欢分享美食和烹饪技巧")
    console.log("【开启第一轮对话】");

    const history = new FileSystemChatMessageHistory({
        filePath,
        sessionId
    })

    const userMessage1 = new HumanMessage("红烧排骨怎么做")

    await history.addMessage(userMessage1);
    const messages1 = [systemMessage , ...(await history.getMessages())]
    const response1 = await model.invoke(messages1);
    console.log(`AI的第一次回答${response1.content}\n`);
    await history.addMessage(response1);

    console.log('【第二轮对话】');
    const userMessage2 = new HumanMessage('好吃吗？')
    await history.addMessage(userMessage2);
    const messages2 = [systemMessage, ...(await history.getMessages())]
    const response2 = await model.invoke(messages2);
    await history.addMessage(response2);
     console.log(`AI的第二次回答${response2.content}\n`);



}

fileHistoryDemo().then(console.log
).catch(console.error);