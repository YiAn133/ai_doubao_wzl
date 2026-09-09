# 流式输出 streamable
    能够边生成，边返回，边展示的交互能力，提高用户体验感
    Chatbot客户端 不断拼接token，流式输出就成了
    在llm服务器和chatbot 客户端俩端接根管子，
    生成的token 就像流水一样不端流向客服端。


llm chatbot 像打字机一样流式输出，体验很好。

## 耗时
主要是推理所花费的时间和问题复杂度


## 约定
- 服务器端约定 接受stream：true  token生成就输出
- 客户端 发送stream：true 表示流式输出

## 使用流式(streaming) 传输减少等待时间
用户体验的打造，前端的责任。必考任务，AI产品的核心体验

- vite 前端项目中集成 deepseek apiKey？
    vite 会帮我们读取.env.local
    vite 是脚手架（node写的）

## VUE 基础
- .vue后缀，也叫组件文件（component）
    facebook 网页由一万多个component组成
    组件就是组成网页的最小单位，方便封装,复用,维护。
vue 前端第二框架 react第一
vue  & React    都是具有组件化思想(component),
数据绑定(data binding) 响应式(reactive)等现代前端开发框架，构成页面的最小的单位不再是html标签，而是组件

## 封装 三部分
- template 模块 html
- script js 逻辑
    引入vue/react   {{}}.vue
    setup:  vue3 新增的语法糖，
    把script 全局的数据直接可以倍template使用
- style 样式 

- 表单元素
    显示值
    用户要修改value
    {{count}}单向数据流绑定
    为了保证数据和界面状态的一致性
    表单元素是个例外，用户的输入，需要传回数据
    双向数据流，v-model
