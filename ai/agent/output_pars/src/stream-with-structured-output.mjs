import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { XMLOutputParser } from '@langchain/core/output_parsers'
import { z } from "zod";

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  }
});

const Schema = z.object({
  name: z.string().describe('姓名'),
  birth_year: z.number().describe('出生年份'),
  nationality: z.string().describe('国籍'),
  occupation:z.string().describe('职业'),
  famous_works:z.array(z.string()).describe('著作'),
  fields: z.array(z.string()).describe('简短传记'),
});

const structredModue = model.withStructuredOutput(Schema)

const prompt = `详细介绍莫扎特的信息`

try {
    const stream = await structredModue.stream(prompt);
    let chunCount = 0;
    let result = null;

    for await(const chunk of stream){
        chunCount++;
        console.log(chunk);
        result = chunk
        console.log(result);
        
    }
} catch (error) {
    
}