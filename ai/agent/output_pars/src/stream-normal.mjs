//流式输出
import 'dotenv/config'

import { ChatOpenAI } from '@langchain/openai'

const model = new ChatOpenAI({
    model:process.env.MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,
    temperature:0,
    baseURL:process.env.OPENAI_BASE_URL
})
const prompt = '你是谁'
console.log('普通流式输出演示：（无结构化）\n');

try {
    // invoke 同步输出
    // stream 流式输出
    const stream = await model.stream(prompt);
    
    let chunkCount = 0;
    let fullContent = '';
    for await(const chunk of stream){
        chunkCount++;
         const content = chunk.content;
        fullContent += content
        process.stdout.write(content) 
    }
} catch (error) {
    
}
