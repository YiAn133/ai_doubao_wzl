import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import{
    InMemoryChatMessageHistory
}from '@langchain/core/chat_history'

import{
    HumanMessage , SystemMessage
}from '@langchain/core/messages'


const model = new ChatOpenAI({
    model:process.env.MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:process.env.OPEAI_BASE_URL,
    temperature:0
})

async function  InMemoryDemo() {
    // 从数组 升华 到 内存记忆
    const history = new InMemoryChatMessageHistory();
    //console.log(history);
    const systemMessage = new SystemMessage("你是一个友好，幽默的做菜助手，喜欢分享美食和烹饪技巧")
    console.log("【开启第一轮对话】");
    const userMessage = new HumanMessage("你今天吃什么？");
    await history.addMessage(userMessage);
    const messages1 = [systemMessage , ...(await history.getMessages())]
    //console.log(messages1);
    const response1 = await model.invoke(messages1);
    console.log(`助手：${response1.content}\n`);
    console.log('【第二轮对话】');
    const userMessage2 = new HumanMessage('好吃吗？')
    await history.addMessage(userMessage2);
    const messages2 = [systemMessage , ...(await history.getMessages())]
    const response2 = await model.invoke(messages2);
    await history.addMessage(response2);
    console.log(`助手：${response2.content}\n`);
    const allMessages = await history.getMessages();
    console.log(`共保存了${allMessages.length}条对话`);
    allMessages.forEach((msg , index) => {
        const type = msg.type;
        const prefix = type === 'human' ? '用户' : '助手';
        console.log(`${index + 1}.[${prefix}]:${msg.content.substring(0,50)}....`);
    })
    
}
InMemoryDemo().catch(console.error).finally(() => {
    console.log('done');
} );