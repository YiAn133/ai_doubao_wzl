## 总结
- 最开始介绍了langgraph的使用方法 
    分支，循环，以及如何保存状态
- 然后回顾了RAG 如何连接Milvus数据库 将文本向量化存入 docker部署的milvus中
    很多的API
- 然后介绍了如何让RAG变advanced（高级） 通过自己写一个langgraph 进行分支，
如果是简单问题，直接llm得出答案，如果是复杂问题那么就结合RAG 进行回答