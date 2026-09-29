# 结构化大模型输出： 

## 流式输出
- stream: true 开启流式输出
- 水管， 一头接着llm server, 一头 客户端， 不断地有token流向 客户端
  buffer 

## stream  服务器端本质
- llm server
- http 协议 
  基于请求响应的简单协议
- 响应？ response 
  - 同步
  - 流式 ？ pipe

## SSE 
Server Sent Events 
服务器单向不停地往浏览器推送消息，发送多次， 不会断开链接
浏览器建立一条长链接，服务器一点一点(chunk发数据)， 也就是流式输出。
```
Conetent-Type: text/event-stream;
Cache-control: no-cache;
Connection: keep-alive;

```


相比于传统的http 同步传输， 请求，响应， 断开链接？
```
Conetent-Type: text/plain
Conetent-Type: text/html
```


## EventSource 类
用于连接SSE , 给他url 
sse 不只有llm 返回， 股票...
stream fs流 pip一下 
当服务器端有新的数据chunk 到达后， 触发 onmessage 事件


最开始搞的是流式输出 -> 现在开始搞输出格式
## outputparser
json -> 继续执行
prompt 约束
大模型按照我们的格式要求， 返回一个json 
key:value,... 
JSON.parse()

## 失败了
json 固定格式 输出， 被markdown 格式包裹，llm 输出常是markdown 格式，
这是展示的需要。
- 移除```json    ``` 包裹
- 正则 replace 方法

prompt output 技巧 -> llm 返回 markdown 格式 -> 正则业务取出md格式 -> JSON.parse()
每次AI 调用的常见业务， langchain 提供相应的业务API, 省去开发的复杂度。


## JsonOutputParser
实例化 JsonOutputParser得到parser
parser.getFormatInstructions() 是告诉llm返回json格式 一般放在prompt中
parse.parse

## StructureOutputParser
- fromNamesAndDescription传入对象，定义类型
- fromZodSchema 直接用zod 来限定格式



## 总结
- JsonOutputParser：只管输出 JSON，字段要你手写。
- StructuredOutputParser：你定义字段，**自动帮你生成字段说明 + JSON 格式要求**。