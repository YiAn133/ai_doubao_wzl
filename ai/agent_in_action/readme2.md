# TOOL，让大模型自动干活


## demo
```
创建一个react+vite的todolist
```
要用到哪些tool？

首先llm会进行任务分解，plainning分成三步
- vite创建项目  写入文件tool
- llm编程能力比较强的模型，就能做的 写入文件tool
- 项目运行起来  调用cli命令的Tool


## 手写一个简单版本的claude code Agent
llm + Tool(fs+cli)


## langchain

llm开发框架 比 openai（transformer，Generative）还早诞生
- llm有很多家 兼容各家大模型
下载第三方包@langchain/openai


## Message
SystemMessage 设置AI是谁，可以干什么，有什么能力，以及一些回答，行为的规范等
HumanMessage
AIMessage
TollMessage 调用工具的结果返回
Tool id


原生 openai 返回工具调用 additonal_kwargs -> tools -> 每个tool langchain invoke 原样输出上面的，同时还会细心准备tools加到后面 对llm工程开发的便携性，可读性帮助

## AI工程
- 工程目录
    根目录 package.json node_modules
- src 开发代码目录
    - promise 特性
    async 函数 promise实例

## 总结第一个编程助手Agent
- ReAct Agent 工作流框架
    分析Agent 的执行流程 每一步的reason act oberve
- langchain
    tools 声明 （async fn + schema(zod)）
    invoke执行 （message，tool，....）
    4种M而是萨格派生类
    modelWithTools llm工作流
    langchain 工作流 ChatOpeanAI -> tools ->  bindTools -> invoke
    llm 工作流编排框架
- Agent 工作流程
    - llm能力边界
        stateless + 不能直接干活
    - 不停维护messages数组
    - llm reason不能直接生成，直接返回带tool的消息
    - tool 执行 ToolMessage tool_id 加入
    - 最简单的loop 有工具调用
        没有 拿着所有的messages 去最后一此调用llm 完成任务拿到结果
- Promise 升级
    async 函数执行完后 是promise return reslove值
    Promise.all find，map
    if（tool）
    try catch