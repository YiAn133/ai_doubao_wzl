# Docuement 切割

- 知识库 放的知识
    知识的来源很多，一个wore文档，一个pdf文件......等
    
    在RAG之前，需要处理知识库，这个就是聊这个

    从各种格式的文件 -> 向量化前的Docuement？通过Loader得到Docuemnt对象
    不能直接创建Docuement对象

## loader
知识库-》向量数据库 
各种知识文件，后缀，不同的文件也有不同的loader 
输入是文件 输出是Documents
两件事情要做
1. 选择相应的loader  180多种 
2. 分块   文件太大， 要检索的是一定大小具有一定语义的chunk 
来自社区 @langchain/community 主要由社区维护， 我们都可以写loader 
langchain @langchain/core 官方维护的 



- 爬虫 crawl
    - 从axios目标url开始，发送请求，拿到html字符串
    - 解析html字符串，提取需要的文本内容
    - cheerio 利用前端思维 css 选择器 需要的内容
    先axios.get（url）得到html字符串
    再通过cheerio 2步走 得到指定内容
    1. const $ = cheerio.load（html）得到Document对象
    2.$(css selector).text();



### AI时代程序员价值
- 不再是coding
- vibe coding 问出好的问题（Prompt），提供丰富准确的上下文（Content），驾驭（Harness）并部署（FDE）Agent产品
设计长时间稳定运行的Loop，用好AI，快速成为一名AI 架构师。


- 切割的意义
     保持语义的完整性
    - separators 语义的最基本构成符号  。？！
    - 按chunkSize 大小 切割
    - 可能出现，上一chunk和下一个chunk的开头 语义相关性最大的，但是被chunkSize切开了，语义大大折扣，这个时候
    用ChunkOverlap 用一定的冗余来确保语义的完整性