import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
// 在之前我们写的项目中，获得大模型的内容，一般都是chioce[0].message.....，通过这个包，可以直接给我们content内容
// output_parsers：俩个作用：1.能固定大模型输出格式  2.能解析大模型的输出文本转为程序直接读取的内容
import { StringOutputParser } from '@langchain/core/output_parsers';
// prompt 好复用
// 以前是硬编码，写在代码里面，不好维护
// 如今 agent很多业务都是prompt 驱动的，不同的用户，是同一套ai业务，只要换身份就好
// 作用:封装固定模板文本 + 占位变量，自动拼接完整 Prompt 传给大模型
import { PromptTemplate } from '@langchain/core/prompts';

// 严谨的
const preciseModel = new ChatOpenAI({
    model:'deepseek-v4-pro',
    temperature:0,
    topK:8,//只从概率前8的词汇里面采样
    maxToken:600,
    apiKey:process.env.DEEPSEEK_API_KEY,
    configuration:{
        baseURL:'https://api.deepseek.com'
    }
});

const creativeModel = new ChatOpenAI({
   model:'deepseek-v4-pro',
    temperature:0.8,
    topK:4,//只从概率前4的词汇里面采样
    maxToken:600,
    apiKey:process.env.DEEPSEEK_API_KEY,
    configuration:{
        baseURL:'https://api.deepseek.com'
    }
})

// 固定好输入模板
const storyPrompt = PromptTemplate.fromTemplate(
    `
    请写一篇短篇散文，主题:{theme}
    风格温柔治愈，篇幅200左右，不用分段，文字细腻有画面感
    `
)

// 我还需要一个解析器，解析llm的输出
const outputParser = new StringOutputParser();

// 设计工作流
const creativeChain = storyPrompt.pipe(creativeModel).pipe(outputParser);

const preciseChain =  storyPrompt.pipe(preciseModel).pipe(outputParser);

// 调用
async function f() {
    const theme = '坚持';
    const ans1 = await creativeChain.invoke({theme}); 
    console.log(ans1);
    console.log('=========================');
    const ans2 = await preciseChain.invoke({theme});
    console.log(ans2);
    
    
      
}

f().catch(err => console.error(err));