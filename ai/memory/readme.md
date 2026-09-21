# Memory管理

Agent = LLM + Harness（tool + RAG + memory + ...）
给模型扩展了Tool ， 让大模型不只是回答问题，而是能调用工具干活。
RAG， 基于Query 获取向量数据库相关的知识放入Prompt
都要依赖于**Memory**

大模型是无状态的，基于上次的回答继徐问，回答

最开始学习都是用一个message数组当成 Memory

Memory 三种思路：
截断：容易丢失上下文
总结：很大程度取决于大模型的能力，也容易，上下文丢失
检索：适合长期记忆
故而需要三者结合

用  InMemoryChatMessageHistory来管理message 放到内存里。
用addMessage 添加到 HumanMessage ， AIMessage，ToolMessage
调用大模型，返回（AIMessage）直接添加到history中。
getMessage()获取所有message每个message对象



## 长时记忆
- 文件存储
- 向量数据库


### memory 逻辑
- 存储逻辑
    内存 文件 数据库
- 管理逻辑
    截断,总结,检索

    

