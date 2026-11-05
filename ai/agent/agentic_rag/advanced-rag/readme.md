## 总结
- 最开始介绍了langgraph的使用方法 
    分支，循环，以及如何保存状态
- 然后回顾了RAG 如何连接Milvus数据库 将文本向量化存入 docker部署的milvus中
    很多的API
- 然后介绍了如何让RAG变advanced（高级） 通过自己写一个langgraph 进行分支，
如果是简单问题，直接llm得出答案，如果是复杂问题那么就结合RAG 进行回答

### 接下来最后的RAG知识，混合检索RAG：多路召回 + 重排模型

混合检索RAG = Milvus 向量检索（适合语义，缺点是不准确） + ES 文本检索（适合关键词，缺点是语义不够丰富）

Agentic
- 如何提高RAG**召回率** ，多路召回([...Mivlus , ...es]) ->去重 ，重排（ReRank） -> Augment(高质量,精简) -> 最终输出

### ES的CRUD




