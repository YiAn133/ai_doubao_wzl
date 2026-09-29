import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { JsonOutputParser } from '@langchain/core/output_parsers'

const model = new ChatOpenAI({
    model:process.env.MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,
    temperature:0,
    baseURL:process.env.OPENAI_BASE_URL
})

// 解析器
const parser = new JsonOutputParser();

const prompt = `
    请介绍一下爱因斯坦的信息，请以JSON格式返回，
    包含以下字段：name(姓名) birth_year(出生年份)
    nationality(国籍)，major_achievements(主要成就，数组)
    famous_theory(著名理论)
    ${parser.getFormatInstructions()}
`
// 从模型返回文本中提取 JSON 字符串
function extractJson(text) {
    // 去掉 markdown 代码块标记（```json ... ```）
    const cleaned = text.replace(/```json|```/g, '').trim()
    // 截取第一个 { 到最后一个 } 之间的内容，兼容前后附带说明文字的情况
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start === -1 || end === -1) {
        throw new Error('未在模型输出中找到 JSON 内容')
    }
    return cleaned.slice(start, end + 1)
}

try {
    console.log("正在调用大模型...\n");
    const response = await model.invoke(prompt);
    console.log(response.content);
    const reslut =  await parser.parse(response.content)
    console.log('\nJSON格式');
    console.log(reslut);
    

    // const jsonText = extractJson(response.content)
    // console.log("\n提取到的 JSON：");
    // console.log(jsonText);

    // const jsonResult = JSON.parse(jsonText)
    // console.log(jsonResult);



    
} catch (error) {
    console.error(error.message);
}