# deepseek-r1-webgpu
简历中的超燃模型，将覆盖以下技能
## 端侧模型
有区别于OpenAI/DeepSeek API调用，大模型不跑在云端，跑在本地
并且OpenAI/DeepSeek
- 贵
- 不安全

本地开源模型部署，在用户端，故而叫端侧模型。
例如手机端，汽车端，Agent任务划分
开源小参数模型就能完成这些任务。

## React + TS
AI时代的大型项目首选前端技术
    - react 比vue 难入门
    - 大型项目
    - AI训练代码 react的偏多

### 新建项目
react + ts + eslint(代码约束，大公司必备，代码风格一致)
eslint 代码约束

## tailwindcss
几乎不在需要写css

## react 组件
搭积木的方式搭建页面，是由一组html，css，js组合在一起的，成为一个组件的功能单元。
vue是用 template script style 写的
react？ 封装一个组件是利用 函数  函数就是组件
    函数返回的 html 就是组件
    函数return 之前 js部分 ， css如何引入
## tailwind 运行原理
- 不是原生css
- 原子类css框架，提供一堆的css类名（原子类）
- 不用写css了，选择器，css 太低效了。
- vite 插件就可以使用，将我们申明的类名，它的样式提取出来，加到代码里
- 原子类名，简单，语义化很好，
- 为什么不能用class？
    因为class 是js里的类名关键字，函数里面写JSX  不能写class，只能用className

- JSX （javaScript with xml）
    JSX 是React 专用语法，能在JS代码里直接写 HTML 标签，编译后转为原生 DOM操作
    
## React 合成事件
- onclick 最原始的 DOM0级事件监听
- DOM 1级事件，没有更新事件相关
- addEventListener DOM 2级事件监听
- react 代码洁癖，能不发明新概念就不
vue 事件绑定是 @click
react 是onClick，注意react里面的事件并不是原生事件，是合成事件


## 封装进度条组件
比较独立，可以复用的业务模块

## 组件树
- 代替DOM树
- 基于组件封装，组件树
    一眼看出页面的组件构成
    页面的交互越来越复杂，故而需要组件作为开发的最小单元
## 两种数据
- state 数据状态
    useState 声明
- props 数据属性
    从父组件传递到子组件的属性，不能在子组件里修改
    如果要修改，必须报告父组件
- 子组件主要负责展示，父组件给我什么props，我显示成什么样子
