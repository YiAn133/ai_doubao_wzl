# react 常用hooks

## useState
响应式的状态
## useEffect
副作用
## useRef
- 可变，但不希望触发渲染？
- 绑定DOM对象
- 注意只有在挂载后，才能获得DOM对象，不能在渲染过程中使用
- 和useState 相同点和区别点
- 都可以存放数据状态，但是useRef不会重新加载组件，useState会重新加载组件
- 
都可以改变
## DOM编程
- js在v8引擎
- dom在渲染引擎
js 里做DOM 编程非常耗性能

总结定义
useRef是 react 的一个提供持久（再次渲染不会重新创建）可变对象的hook函数，经常用来引用DOM节点对象。它有一个current属性，可以
指向任何值或对象，不会重新触发渲染。

## worker线程
- JS默认是单线程的，由于有些任务，太过于耗时，页面会卡住，故而引入worker
worker = 浏览器开独立子线程，专门跑重计算
限制
❌不能操作 DOM、不能用 React Hooks
线程之间不共享变量，靠postMessage()发消息拷贝数据通信
核心 API
new Worker('worker.js') 创建子线程
.postMessage(数据) 发消息
.onmessage 接收消息
.terminate() 销毁线程

# Web Worker线程
当任务超过了js的event loop 机制 就要用worker线程
浏览器提供给js 可以调用的耗时性计算，或者llm，游戏等复杂任务的worker线程。
- 开启一个新的线程
new Worker(
    new URL('./worker.js',import.meta.url)
)

## 总结
useRef 可以用来持久存放web-worker实例，组件每次渲染不会重置该线程对象，并且在useEffect组件挂载后初始化，
以及组件卸载时销毁线程。

