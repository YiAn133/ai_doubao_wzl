import 'dotenv/config';
import { MultiServerMCPClient } from '@langchain/mcp-adapters'
import { HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages'
import { ChatOpenAI } from "@langchain/openai";

import chalk from 'chalk'

const mcpClient = new MultiServerMCPClient({
    mcpServers: {
        uer_server: {
            command: 'node',
            args: ["C:\\workSpace\\ysw_ai\\ai\\agent_in_action\\mcp-demo\\src\\my-mcp-server.mjs"]
        }

    }
})


const model = new ChatOpenAI({
    modelName:'deepseek-v4-flash',
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature:0,
    configuration:{
        baseURL:'https://api.deepseek.com/v1'
    }
});


const tools = await mcpClient.getTools();
const res = await mcpClient.listResources();
console.log(res,'-------');
let resourceContent = '';
for(const [serverName , resources] of Object.entries(res)){
    for(const recource of resources){
        const content = await mcpClient.readResource(
            serverName,recource.uri
        )
          resourceContent += content[0].text
    }
  
}

const modelWithTools = model.bindTools(tools);

async function  runAgentWithTools(query , maxIterations = 30) {
    const messages = [new HumanMessage(query),new SystemMessage(resourceContent)];

    for(let i = 0 ; i < maxIterations ; i++){
        console.log(chalk.bgGreen(`正在等待AI思考，第${i}轮....`));
        const response = await modelWithTools.invoke(messages);

        messages.push(response);

        if(!response.tool_calls || response.tool_calls.length === 0){
            console.log(`\n AI 最终回复：\n ${response.content}`);
            return response.content;
        }
        console.log(chalk.bgBlue(`检测到${response.tool_calls.length}个工具调用`));
        console.log(chalk.bgBlue(`工具调用:${response.tool_calls.map(t => t.name).join(', ')}`));

        for(const toolCall of response.tool_calls){
            const foundTool = tools.find(t => t.name === toolCall.name);

            if(foundTool){
                const toolResult = await foundTool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    content: JSON.stringify(toolResult),
                    tool_call_id: toolCall.id
                }));
            }

        }
        
    }

    // 到达极限了
    return messages[messages.length - 1].content;
}

await runAgentWithTools('请问MCP Server的使用指南是什么？');

// 关闭所有MCP子进程与通信通道，释放进程资源
// 关闭MCP Server 的通信通道
// my-mcpserver.mjs被启动了，手动关闭进程
// 释放相关资源，避免脚本一直挂着不退出
await mcpClient.close();