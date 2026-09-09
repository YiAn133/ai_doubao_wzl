# 大模型是怎么随机说话的？

- 把temperature 拉高 随机性增加，生成会不太靠谱
- 但是有些创作类的 需要随机性增加创意，同时想保证质量
分两步做
- 先用 Top K 把高概率的词选出来
- 再用temperature 控制随机性

- temperature 和 Top K 不可能都太大的，也不可能都小
    temperature 小 Top K 大，这个就准确
    temperature 大 Top K 小，靠谱的创意

## langchain
lang(uage) + chain(llm 工作链 | 流编排)

### 核心模块 @langchain/core
- message 对话列表
- outout_parsers 输出解析器
- tools
- prompts 提示词模板

## AI 工作流
- llm 俩个创意和严谨的 大模型
- PromptTemlate
- StringOutputParser

llm -> PromptTemlate -> StringOutputParser -> end