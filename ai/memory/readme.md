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
- trimMessages 帮我们实现基于token的截断
- getBufferString 把history message 转为字符串，并且前面会带上你是什么类型AI？Hunman？
学习下 如何进行token进行截断？


总结：这几天学习的Memory模块
从最开始的用消息数组，存放每次与大模型的对话记录
到后面用内存存储，把用户的问题存放到内存存储中，每次用户问问题的时候，可以先去内存存储中查询，是否有相关内容，可以让AI记住，用户之前的提问
再到后面用文件存储，后面的步骤和内存存储一样
同理也可以从文件中读取数据
然后学习了如何保留我想保留的信息，然后把不要的那些消息进行总结
    这里分俩个：1.直接保留2个最新的数组，剩下的直接总结
            2. 按照token计算，保留想保留的数组，剩下的总结
再往后学习了，如何连接Milvus把所有的数据放入其中，每次对话的内容也放入，这样大模型就越来越懂你了