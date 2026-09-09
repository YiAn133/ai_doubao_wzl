# MCP
- 这里的tool有什么问题？
1. 只能在我们这个项目用，不能在其他项目用
2. node写的，如果用java/python/rust写的tool呢？

tool 独立于llm，本地，远程/跨进程/跨语言调用


## MCP协议

- 标准化llm与tool和资源之间的通信
    llm 和 tool解耦
- 基于stdio 标准输入输出流：键盘输入，控制台输出，当一个进程（Agent）调用一个子进程（child_process）或其他语言进程时，可以通过stdio标准输入输出实现通信
- http 远程通信 MCP 掌管
 
 不管是本地工具，还是远程工具，agent想跨进程调用某个工具，通过MCP协议就行。
 是给Model扩展Context上下文，让它能做的更多，知道更多的Protocol协议

 ## MCP的特点
  MCP 最大的特点就是可以**跨进程**调用工具
  跨本地的进程调用，就是stdio。
  跨远程的进程调用，就是http。
  ai agent 是MCP客户端（host） ，可以通过MCP协议调用各种MCP Server，clients配置添加，实现**跨进程**工具调用。
它和fetch不同，不是接口调用，不是拿接口数据，它是要拓展Context上下文

## MCP Tool
本质tool，


## resourses
- MCP stdio/http跨进程提供Tool/Resource/Prompt
    Tool 最常见 和Tool Use 没啥区别，只是MCP server是跨进程，独立进行的
    - IPC
    父子进程 child-process
    其他语言,远程   cilent(child-process,MultiServerMCPClient)和MCP server通信
- resource 可以作为SytemMessage prompt的一部分 成为
Context
    - server里registerResource
    URI docs：//
    - host
    MultiServerMCPClient getResources
    Object.entries 拼成字符串
    RAG 之外 丰富上下文的一种手段

