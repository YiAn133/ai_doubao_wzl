 # Harness Engineering
用工程化手段  让AI Agent 可靠，持续完成任务。
智能体工程 AI Agent Harness 
将大模型的行动和决策 变为可观察的，将返回结果返回给大模型，直到任务完成

 ## 包含6个基础模块
 - Loop 主循环
 ReAct


 - Tool 工具集

 - Context 上下文管理器
输入给模型的全部内容：系统提示词,历史对话,rag，es上下文，工具返回结果 上下文压缩，窗口控制。

- Environment 沙盒环境
 工具运行时的隔离环境， 文件系统、网络、权限、工作区隔离 
- Memory 记忆层
    跨轮次，跨会话 状态持久化状态，短期记忆 + 长期记忆

- Observabilite 可观察性
日志（分析）、Trace、 评估指标、 调试、回放、评测

除了6个基础模块，包含一些可拔插的高级模块
- sub Agents
    主Agent 分配子Agent 并且子Agent有独立的模块，上下文不会被 主Agent打扰，同理主Agent也不会被子Agent打扰
- hooks
- Police & Safety 安全 与策略层
    权限,输出过滤，资源配额
6大基础模块是最小内核：sub-Agents 属于高级编排可扩展的模块

## Sub Agents 子智能体
- 清晰的任务拆分
- 独立不受影响的上下文 
  主Agent 
    负责分配任务和检查  上下文不应收到太多细节的干扰
    派发任务给子Agent 独立的运行上下文
    按需加载tools, 不用一次性加载那么多
## 为什么是Agent 而不是Workflow?
固定workflow 是预先写死的步骤（coze/dif/n8n 23-25年， 较固定，简单的任务），只能按预设路径执行， 无法应对不确定，动态变化的任务。
多Agent (含subAgent) 可自主拆解任务， 按需调用能力， 根据中间结果调整执行分支， 适合需求模糊， 存在未知问题的复杂场景，
具备更强的自适应与容错能力。