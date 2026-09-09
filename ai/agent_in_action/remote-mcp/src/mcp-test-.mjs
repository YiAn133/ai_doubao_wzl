import 'dotenv/config';
import{ MultiServerMCPClient } from '@langchain/mcp-adapters';
import{ ChatOpenAI } from '@langchain/openai';
import{ 
    HumanMessage, 
    AIMessage,
    SystemMessage,
    ToolMessage
} from '@langchain/core/messages';

import chalk  from 'chalk';

const model = new ChatOpenAI({
    modelName:'deepseek-v4-flash',
    apiKey: process.env.DEEPSEEK_API_KEY,
    temperature:0,
    configuration:{
        baseURL:'https://api.deepseek.com/v1'
    }
})

const mcpClient = new MultiServerMCPClient({
    mcpServers:{
        'amap-server':{
            url:'https://mcp.amap.com/mcp?key=63522562027366737ae788ae799821c7'
        },
        'my-mcp-server':{
            command:'node', 
            args:['C:\\workSpace\\ysw_ai\\ai\\agent_in_action\\mcp-demo\\src\\my-mcp-server.mjs']
        },
        'chrome-devtools':{
            command:'npx',
            args:['-y', 'chrome-devtools-mcp@latest']
        },
        'filesystem':{
            command:'npx',
            args:['-y', '@modelcontextprotocol/server-filesystem', 'c:\\workSpace']
        }
    }
})

const tools = await mcpClient.getTools();
console.log(tools);
const modelWithTools = model.bindTools(tools);

async function  runAgentWithTools(query , maxIterations = 30) {

    const messages = [new HumanMessage(query)];
    
    for(let i = 0 ; i < maxIterations ; i++){
        console.log(chalk.bgGreen(`第${i}次迭代`));
        
        const response = await modelWithTools.invoke(messages);
        messages.push(response);

        if(!response.tool_calls || response.tool_calls.length === 0){
            console.log(chalk.green.bgRed(`AI回答：第${i}次迭代`));
            return response.content;
        }
        console.log(chalk.bgBlue(`工具调用:${response.tool_calls.map(t => t.name).join(',')}`));

        for(const toolCall of response.tool_calls){
            const foundTool = tools.find(t => t.name === toolCall.name);

            if(foundTool){
                const toolResult = await foundTool.invoke(toolCall.args);
                let contentStr;
                if(typeof toolResult  === 'string'){
                    contentStr = toolResult;
                }else if(toolResult && toolResult.text){
                    contentStr = toolResult.text;
                }
                messages.push(new ToolMessage({
                    content: contentStr,
                    tool_call_id: toolCall.id
                }));
            }
        }
        


    }
    
    return messages[messages.length - 1].content;
}

await runAgentWithTools(`北京南站附近的酒店，最近的 3 个酒店，拿到酒店图片，打开浏览器，展示每个酒店的图片，每个 tab 一个 url 展示，并且在把那个页面标题改为酒店名`);

await mcpClient.close();