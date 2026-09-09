import { tool } from '@langchain/core/tools';
import fs from 'fs/promises';
//判断路径的合法性，路径的拼接
import path from 'node:path';
import{ spawn } from 'node:child_process'
import{ object, z } from 'zod';
import { tr } from 'zod/v4/locales';
import { Schema } from 'zod/v3';





//读取文件
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


//写文件
const writeFileTool = tool(
    async({filePath , content}) => {
        try{
            const dir = path.dirname(filePath);
            console.log(dir,'目录');
            //如果存在，不创建，如果不存在那么就递归创建
            await fs.mkdir(dir,{recursive:true});
            //写入文件
            await fs.writeFile(filePath , content , 'utf-8');
              console.log(`[工具调用] write_file(${filePath})
            成功写入 ${content.length} 字节`)
            return `成功写入 ${filePath}`
        }catch(err){
             console.log(`[工具调用] write_file(${filePath})
            错误： ${err.message}`)
            return `写入文件失败：${err.message}`
        }

    },
    {
        name:'write_file',
        description:'向指定路径写入文件内容，自动创建目录',
        schema:z.object({
            filePath:z.string().describe('文件路径'),
            content:z.string().describe('文件内容')
        })
    }
)

//列出目录内容工具
const listDirectoryTool = tool(
    async ({directoryPath}) =>{
        try {
            const files = await fs.readdir(directoryPath);
            console.log(`[工具调用]list_directory(${directoryPath})成功列出${files.length}个文件和文件夹`);
            return `目录内容：\n ${files.join('\n')}`
            
        } catch (err) {
            console.log(`[工具调用]list_directory(${directoryPath})
                错误：${err.message}`);
            return `列出目录内容失败:${err.message}`
        }

    } ,
    {
        name:'list_directory',
        description:'列出指定，目录下的所有文件和文件夹',
        schema:z.object({
            directoryPath:z.string().describe('目录路径')
        })
    }
)

//执行命令工具（带实时输出） 
const executeCommandTool = tool(
    async({command , workingDirectory}) => {
        const cwd = workingDirectory || process.cwd();
        console.log(`[工具调用]execute_command(${command})工具目录：${cwd}`);
        
        return new Promise((resolve, reject) => {
            const [cmd, ...args] = command.split(' ');
            const child = spawn(cmd, args, {
                cwd,
                stdio: 'inherit',
                shell: true
            })

            let errorMsg = '';
            child.on('error', (err) => {
                errorMsg = err.message
            });
            child.on('close', (code) => {
                if (code === 0) {//运行顺利，成功退出
                    console.log(`[工具调用]execute_command(${command})成功执行`);
                    const cwdInfo = workingDirectory ?
                        `\n\n重要提升：命令在目录"${workingDirectory}"执行` : '';
                    resolve(`成功执行${command}${cwdInfo}`);
                } else {
                    console.log(`[工具调用]execute_command(${command})
                    退出码:${code}`);
                    resolve(`命令执行失败，退出码:${code}\n错误： ${errorMsg}`);
                }
            });
        })
       

    },
    {
        name:'execute_command',
        description:'执行系统命令，支持指定工作目录。实时显示输出',
        schema: z.object({
            command:z.string().describe('要执行的命令'),
            workingDirectory:z.string().describe(`工作目录(推荐指定)`)
        })
    }
)

export{
    readFileTool,
    writeFileTool,
    listDirectoryTool,
    executeCommandTool
}