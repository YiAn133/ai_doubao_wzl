# RAG

Retival 检索器

知识库 -> 先embedding 向量数据库 -> 检索器 （embeddin + 行速度 + prompt embedding）

## langchain RAG 业务能力
开箱即用的llm开发框架
- @langchain/openai  提供俩个API：ChatOpenAI Embedding
- @langchain/core/documents
    embedding 的最小单元
    知识库 由文件（文本,声音,图片,视频等）构成
    某个段落的文字  有我们要找的语义
    @langchain/core/documents可以提供
    {
        pageContent:'要单独embedding的文本'，
        meta：{元数据  用来对pageContent进行解释的（不做embedding）
            .....   
            link
            author：....
        }
    }
     documents ....  简单就放内存  复杂就放数据库

- @langchain/classic    可以提供llm 开发以来 langchain的经典常用模块
MemoryVectorStore 内存向量存储

检索器 = （知识库 -> 文档 -> docuements -> embedding -> MemoryVectorStore）

- retriever.invoke(3)
    在相似度的查询的基础上，还会做去重,过滤,rerank等
- vecor.similaritySearchWithScore 只做向量查询
score 会表达内容的质量  增加高质量的数据 