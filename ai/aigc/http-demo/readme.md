# LLM http 接口

- openai SDK
    可以利用openai已经写好了的工具包 不用node.js 写一大堆http请求 来创建服务器与大模型结合的http请求
    OpenAI SDK 只是 Node.js 服务器里的一个 "工具"，只负责一件事：帮你的服务器和 OpenAI 的服务器说话。
     缺点是只能使用openai写好的API
- fetch请求
    可以调用任何符合http协议的东西 缺点是复杂需要自己手动处理所有底层细节（认证、JSON 转换、错误处理、重试、流式输出等）


## 前端发送http 请求，有哪些方式？
- fetch
- xmlhttprequest