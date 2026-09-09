# Agent

最值钱的Agent开发

如何打造自己的Agent？

## 不是直接调用大模型接口
llm 有些问题
- 你上周和它聊过的消息，它无法直接记住
配合数据库，前端存储，redis，llm+后端
可以实现Memory模块
- 让llm 帮访问一个网页，做一些事情，llm只能告诉你思路，我们自己做

Tool Use模块
- 访问内部私有文档，llm是不知道的
利用RAG 模块
- 最新的世界杯新闻，新的不再预训练数据中
    MCP（第三方Tool，llm协议）Tool
- 做ppt，分析股市并自动买卖
    skills 技能 蒸馏



Agent 就是围绕以上问题 给llm加上Memory 记忆模块，Tool工具调用能力，RAG，MCP,Skills等

Agent = llm + Memory + Tool + RAG + MCP + Skills

例如：Claude code ， codex 等

# Agent 的工作流程
user 以prompt 的形式，提出一个任务（复杂）交给Agent 智能体 llm planning/Reasioning(规划/推理) -> 要不要加载memory ->要不要调用工具(分步骤多个工具) -> RAG(查询出来的内容Prompt Template) -> response -> user(任务完成)

## Agent 开发框架 Langchain
后端node(nest.js) + langchain(单智能体开发框架) + langgraph(多智能体开发) 

结合后端技术，开发AI 全栈Agent产品，让AI技术通过Harness Engineering落地，实现AI技术的商业价值(FDE)

Agent 其实不复杂，llm本身也可以思考，规划，给它用Tool扩展能力，能自己做事情了，用memory管理记忆，它就可以记住你要它记住的东西。还可以用RAG查询内部知识库来获取知识


这样一个知道内部知识，能思考，规划，能够帮你做事情的扩展后的大模型，就是一个Agent。

学习目标：
- nest.js
- langchain
- langgraph
- MCP\RAG\Skills


## langchain
- LLM
统一且兼容 chatOpenAI
 下载@langchain/openai

 - Tool
 langchain 又来接管@langchain/core zod 验证工具
 tool openai 接口里面有描述和格式的约束
 - 2个部分（异步）处理函数
 函数描述对象
 name：功能名字
 descript： 要详细功能，覆盖场景
 schema 参数约束 tool 与 llm 要调用此工具，必须提供schema 约定的参数

 - tool的 返回格式
    - llm 有自知之明，当要调用tool的时候，不生成，停下来告诉用户tool_calls 要调用的工具列表
    id name grguments 多个工具 id 关联等下tool 函数调用的结果，需要历史会话的列表，才能组成完整的任务上下文
    tool 异步的，llm哪个任务细节由哪个工具执行了，id关联llm基于自然语言


### llm Tool 性能
- llm 任务复杂，可能调用多个tool，每个tool调用多次
- Promise.all **并发**多个promise，等待所有的Promise都完成，才返回结果
- Promise.all（【promise数组】）并行执行多个任务，等待所有任务都完成，才返回结果，结果顺序与promise顺序一样
