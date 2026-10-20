# Agentic RAG


## RAG
公司内部的Agent 基本都要用到RAG
llm能思考 ，但不知道公司内部的文档，我们需要基于内部文档来回答问题
但是流程过于固定，有缺点
- 比如我们无法判断 当前用户的问题是否去查询RAG 还是直接输出？
- 没有纠错和评估机制，无法判断检索内容是否精确。制作llm评估函数
- 处理不了多步检索的复杂问题，比如先查A，再查B 才能得出结论。用llm规划能力 拆分
- 专业术语 更适合关键词检索，纯语义检索容易匹配不准。用关键词检索
- 本地知识库没有的内容，容易产生幻觉，那么就去网络搜索

让死板的检索生成 升级为 可思考，可判断，可纠错的智能RAG架构

## Agentic RAG
自主规划，更智能，评估

用langgraph 设计一个graph表示Agentic RAG流程

简单的问题 任然会走retrieve 浪费token
我们在langgraph中添加一个判断


## 继续优化现在RAG 的问题
- 现在的RAG无法处理需要多部检索的复杂问题，比如先查A，再查B才能得出结论
 为什么需要这步？ 因为当用户问的问题有很多 方面的时候，直接向量化后 去检索 得到的答案，不准确
 
## 网络搜索来兜底
本地知识库没有的内容，不会主动去网络搜索补充，容易编造答案。
 混合检索 = 向量数据库 + 网络搜索 + elasricsearch
 
 ----------------------------------------------------

## 截至目前的总结
- 最开始是描述一个普通的RAG，根据用户的提问直接去RAG进行检索，拼接进上下文，llm输出
- 然后升级为有分支 判断用户的提问是普通问题，还是和RAG相关的问题 再去llm输出
- 再之后考虑到用户的提问中 可能包含多个问题，这时候我们可以先进行问题拆分，再进行RAG检索，再去llm输出
- 然后再是联网搜索，RAG中没有的去联网搜索，有的就去RAG检索，再llm输出


网络搜索的结果，增强prompt 
混合检索 = 向量数据库 + 网络搜索 + elasticsearch

## 倒排索引
ES 相比于MySql 最大的核心优势， 基于**倒排索引**底层机制

普通MySQL 使用的是正向索引：
以一行为单位存储完整数据， 检索文本内容时， 需要逐行遍历，逐字匹配内容。 
数据量越大， 文本越长，模糊/文本搜索就越慢， 性能越差， 不适合大范围关键词检索。
ES 使用倒排索引机制：
正向索引： 文档 -> 关键词
会自动对text 类型字段进行分词处理， 才结尾一个个独立词条， 再以词条为核心，反向
关联所有包含该词条的文档。
倒排索引 关键词-> 文档 

用户输入关键词检索， ES只需要通过词条快速匹配对应的文档， 无需全表遍历， 实现
**海量**文本下**毫秒**级的全文检索。

- 基于请求
  GET 查询  /_cat/indicies
  输出所有的索引    table 组织并显示
- 创建索引 PUT /article
  建表一样 mappings  schema 
  properties 和搜索相关的各个字段
  title,content  分词 type: text 全文检索 
  author   不分词  精确匹配 
- 自动去分词建索引  将ID放入列表 
  keyword 不分词，整值精确匹配
  type="text"  type="keyword"
  **全文检索**加**精确过滤**

- 检索API 
  GET /article/_search 
  {
    "query": {
      "match": {
        field: "词 "
      }
    }
  }

- DSL
  Mysql SQL 
  Milvus embedding 
  DSL 全称 Domain Specific Language，领域特定语言
  Elastic Search  http 查询

- ik_max_word + ik_smart 中文友好分词器的两种
  存的时候 ik_max_word， 尽量的多存索引， 粒度更细
  ik_smart 去的时候， 粒度粗一点， 

- evaludate_local
条件边考虑 网络搜索的死循环护栏

if (state.webContext && string(state.webContext).trim()) {
    return "generate"
  }