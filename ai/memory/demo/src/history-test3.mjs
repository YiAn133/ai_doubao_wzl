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
    const filePath = path.join(process.cwd() , "chat_history.json")
    const sessionId = "user_session_001";
    const systemMessage = new SystemMessage("你是一个友好，幽默的做菜助手，喜欢分享美食和烹饪技巧")
    const restoredHistory = new FileSystemChatMessageHistory({
        filePath,
        sessionId
    })
    const restoredMessages = await restoredHistory.getMessages();
    console.log(`从文件中恢复${restoredMessages.length}条历史信息`);
    restoredMessages.forEach((msg , index) => {
         const type = msg.type;
        const prefix = type === 'human' ? '用户' : '助手';
        console.log(`${index + 1}.[${prefix}]:${msg.content.substring(0,50)}....`);
    })
    const userMessage3 = new HumanMessage("需要什么食材")
    await restoredHistory.addMessage(userMessage3);
    const message = [systemMessage , ...(await restoredHistory.getMessages())]
    const response3 = await model.invoke(message);
    console.log(`AI的回答是${response3.content}`);
    

}

fileHistoryDemo();