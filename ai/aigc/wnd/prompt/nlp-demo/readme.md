# Prompt 做NLP 任务开发

- 有哪些东西可以模块化？
  import   from 
  export default 
  - 维护和可读性
  - 好复用  引入
- 项目的模块化搭建
  - main.mjs 单点入口 （鉴权、路由）
  - client.mjs client 对象
  - completion.mjs 完成任务的函数
 
## es6 语法特性
es6 是javascript 在2015年推出的新版本，变化比较大，目标是让JS 成为一个企业级大型项目开发语言。
- let const 声明提升bug ,支持块级作用域
  let const 不能重复声明， const 简单数据类型不能重新赋值，复杂数据类型可以重新赋值，但不可以改变其指向的内存地址（类型）
- ... rest 运算符 收 | spread 展开运算符
- 解构赋值
  - 对象
  - 数组 简洁且性能好
- 模块化 esm 模块
  - import  from 
  - export default 
  - export 

## nlp 任务被大模型处理后 在企业中有什么用?
- 情感分类 sentiment analysis(classification)
  正面 | 负面 | 中性
  电商等行业中非常重要 客户服务、预警、产品质检等
  后台 
- 信息提取 information extraction
- 文章总结
- 主题推断

 

## 如何利用Node.js连接AI大模型
  1. 初始化项目npm init -y
  2. 安装openai pnpm i openai dotenv
  3. 创建client.mjs 和 mian.mjs 和 completion.mjs .env文件
  4. 在client.mjs中引入openAI 还有dotenv 写一个dotenv.config()作用是加载环境变量 到 process.env中
  5. export const client = new openai({
    apiKey：一般是写成process.env.DEEPSEEK_API
    baseurl：一般是携程process.env.DEEPSEEK_BASE_URL
  })
  6. 在completion.mjs中 引入client对象 import {client} from ‘./client.mjs’
  7. const response = asaync(请求是异步的) client.chat.completion.create({
    model：process.env.Model
    message:[{
      role:'user',content:'prompt'
    }]

  })