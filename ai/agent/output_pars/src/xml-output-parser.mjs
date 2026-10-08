import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { XMLOutputParser } from '@langchain/core/output_parsers'

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  }
});

const parser = new XMLOutputParser();

const question = `
    请提取一下文本中的任务信息：爱因斯坦生于1879年，是一位伟大的物理学家。
    ${parser.getFormatInstructions()}
`

try {
    console.log('调用中....\n');
    const response = await model.invoke(question)
    console.log(response.content);
    const reslut = await parser.parse(response.content)
    console.log(reslut);
    
} catch (error) {
    
}