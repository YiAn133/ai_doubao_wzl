# MCP

Context Engineering和非常火的MCP（Model Context Protocol） 协议


http协议，Protocol协议

MCP 是Anthropic公司 于2024年 11月25日推出的

AI界通用USB-C 接口协议 电脑端会安装 llm客户端
MCP的作用就是让大模型能连接"上下文"可以是资源 可以是软件等等
而且是做成统一的格式，不需要再专门写接口代码

MCP client(Cursor , Trae , Calude , Code , Codex),对接Claude OpenAI 等各大模型


有了MCP 不用为不同模型写对接代码 能轻松把各类数据工具标准化接入大模型上下文中

三部分
- MCP Server
    服务端 提供了大模型想用的各种上下文
    定义好server 如何和client交互
- MCP Host宿主
    Claude code等AI Agent
- MCP client 客户端



总结：用户通过 于 host交互，通过推理，发现不是预训练的知识能回答的，去看下host里面有哪些client，可以为我们的任务提供上下文，然后去调用MCP server 然后把数据返回给client client再返回给host，host再结合上下文总结出答案

有了MCP，就好像USB-C 数据接口 ，能实现任意MCP 服务端和客户端的自由互联，依托这套统一标准，大模型可调用的上下文来源极大扩充，各大外部数据与工具的接入调用变得高效

## 案例
- npm i -g @modelcontextprotocol/server-filesystem
MCP 官方文件系统服务端，安装完了，可以让MCP有读写本地文件夹的能力
- npx是临时使用这个工具：如果当前没有这个工具会下载，当终端关闭的时候，会删除下载的工具

MCP 不单单只是便利，而是根本上重构了AI的整个应用架构，真正把AI，从chatbot 推到了Agentic AI （智能体AI）阶段


## MCP是什么？
- 它不是一个工具，也不是一个应用，不是一个api sdk 也不是一个产品，而是一个协议。它的目标是希望任何一个AI模型， 能以统一的方式去访问资源和工具。
mcp就是llm和外部世界的一个通信协议
模型需要交互什么呢？ 模型想知道，能用，能调的内容

### 资源
数据库，API，文件，Sass（飞书，高德地图）

### Tool
创建日历，发邮件，执行命令，远程控制。

这些资源和工具就是让模型变得真正有用的上下文和能力

