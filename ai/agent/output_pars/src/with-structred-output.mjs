import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import { z } from 'zod';

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  }
});


const scientistSchema = z.object({
  name: z.string().describe('科学家的姓名'),
  birth_year: z.number().describe('出生年份'),
  nationality: z.string().describe('国籍'),
  fields: z.array(z.string()).describe('研究领域列表'),
});


const struredModel = model.withStructuredOutput(scientistSchema)

const result = await struredModel.invoke('介绍一下爱因斯坦')

console.log(result);
console.log('------------------');
console.log(JSON.stringify(result,null , 2));


