import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { 
    HumanMessage, //user role:'user'
    SystemMessage,
    ToolMessage,
    AIMessage 
} from '@langchain/core/messages';
import fs from 'node:fs/promises';
import { z } from 'zod';  // z 提供类型约束
import 'dotenv/config'


const model = new ChatOpenAI({
    modelName:'deepseek-v4-flash',
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature:0,
    configuration:{
        baseURL:'https://api.deepseek.com/v1'
    }
});



//读文件工具
const readFileTool = tool(
    async({ filePath }) => {//实现功能函数
        const content = await fs.readFile(filePath , 'utf-8');
        //实时反馈Agent 执行消息
        //Agent 任务可能很复杂，很耗时，需要给用户反馈，用户可能太久，没有看到反馈，就退出了
        console.log(`[工具调用]read_file(${filePath})
            成功读取${content.length}字节内容
            `);
        return content;

    },
    {//说明这个功能的名字和功能
        name : 'read_file',
        description: `用此工具读取文件内容，当用户读取文件,查看代码，分析文件内容时，调用此工具,
        输入文件路径(可以是相对路径或绝对路径)`,
            schema: z.object({
            filePath: z.string().describe('要读取的文件路径')
        })
    }
)


//多个工具
const tools = [
    readFileTool
]


//langchian 提供了llm和tools 注册的抽象
 const modelWithTools = model.bindTools(tools);

 const messages = [
    new SystemMessage(`
        你是一个代码助手，可以使用工具读取文件并解释代码.

        工作流程：
        1.用户要求读取文件时，立即调用read_file工具。
        2.等待工具返回文件内容。
        3.基于文件内容进行分析和解释。

        可用工具：
        - read_file:读取文件内容（使用此工具来获取文件内容）
        `),
        new HumanMessage('请读取./src/tool.mjs 文件内容并解释代码')
 ]


 let  response = await modelWithTools.invoke(messages);


 messages.push(response);

 //多个工具await read await write 等 如何并发执行？
//response.tools,性能，有多个任务 Promise.all tool promise 数组
//tool 执行结果 每个结果 带上tool id ToolMessage 给messages把整个messages数组 打包给llm，得到最后的结果 
while(response.tool_calls && response.tool_calls.length > 0){
    console.log(`\n[检测到${response.tool_calls.length}]个工具调用`);
    const toolResults = await Promise.all(
        response.tool_calls.map(async (toolCall) => {
            //需要检验，以及准备的逻辑
            const tool = tools.find(t => t.name === toolCall.name);
            if(!tool){
                return `错误：找不到工具${toolCall.name}`
            }
            console.log(`[执行工具]${toolCall.name}
                (${JSON.stringify(toolCall.args)})`);
                try{
                    const result = await tool.invoke(toolCall.args);
                    return result;
                }catch(err){
                    return `错误：${err.message}`
                }
        })
    )
    
    response.tool_calls.forEach((toolCall , index) => {
        messages.push(
            new ToolMessage(
                {
                    content: toolResults[index],
                    tool_call_id: toolCall.id
                }
              
            )
        )
    })

    response = await modelWithTools.invoke(messages);
    console.log(response);
    messages.push(response);
}