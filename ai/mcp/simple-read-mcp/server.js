//实例化mcp server
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
//本地通信
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
    ListToolsRequestSchema, 
    ListRootsResultSchema, 
    CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';



import fs from 'fs/promises';


const server = new Server(
    
    {name:'simple-read-mcp',version:'1.0.0'},
    {capabilities:{tools:{}}}
);


//处理agent 请求 事件、
//ListToolsRequestSchema 是mcp事件之一  列出所有工具
server.setRequestHandler(ListToolsRequestSchema , async() => {
   return {
    tools:[
    {
         name:'read_file',
         description: '读取指定路径的本地文件内容',
         inputSchema: {
            type:'object',
            properties:{
                path:{
                    type:'string',
                    description:'文件的绝对和相对路径'
                }
            },
             required:['path']
         }
    }
]
   }
})

//调用工具
server.setRequestHandler(CallToolRequestSchema , async (request) => {
    const{name , arguments:args} = request.params;
    if(name === 'read_file'){
        try{
            const content = await fs.readFile(args.path , 'utf-8');
            return {
                content:[
                    {type:'text',text:content}
                ]
            }
        }catch(err){
            return {
                 isError : true,
                content:[
                {type:'text',text:`读取失败：${err.message}`}
            ]
            }
           
        }
    }
    throw new Error(`未知工具:${name}`);

})


async function main() {
    //连接本地transport,打通连接隧道
    const transport = new StdioServerTransport();
    await server.connect(transport);
}


main();