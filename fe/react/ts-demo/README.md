# React + TypreScript
- React + ts非常适合企业级开发
- ts提供了类型约束，静态编译，大型语言的丰富功能

## React 的类型约束
- React.FC
react 函数组件的类型

React.FC 父子之间props声明，数据约束 ts 出现
FC<T> 泛型，泛值内部的类型，props

type FC<P = {}> = FunctionComponent<P>; react 源码

 FunctionComponent 函数组件类的声明，返回一定是ReactElement（返回jsx）
 就是写一个接口 规定规则，然后泛式规定传递的参数
 如果一个参数可以接受多个类型 name:string|number

 总结类型限定分俩个：
 type的写法 
 type Props = {
  name:string
 }

  和
  写interface的写法
  interface Props  {
    name:string
}

如果写 React.FC，就用泛型 React.FC<Props>，参数不要再写 :Props
如果参数写 :Props，前面就不要写 React.FC。
二者不要混用。

- interface 自定义事件
- 函数的类型声明 () => void;表示只进行调用，不考虑返回值
- React 合成事件：React.ChangeEvent<>泛指内部需要用的类型 ， 事件最重要的事件发生的元素


组件函数（渲染页面）：React.FC<Props>，返回 JSX
普通回调（无参数）：() => void，比如简单点击
事件回调（带事件对象 e）：(e:React.XXXEvent<HTMLXXXElement>) => void，input、button 事件

ChangeEvent：输入框内容改变事件
MouseEvent：鼠标点击事件
HTMLInputElement：对应 html 的<input>标签
HTMLButtonElement：对应 html 的<button>标签
口诀：什么事件 + 什么标签


- 组件升级
  - 单向数据流

- userEffect
  - 副作用
在组件挂载后，再去请求接口，拿到数据，响应式更新 满足组件即刻挂载，快（第一步） ，更新状态（第二步）
说白了userEffect就是为了处理无法写在函数顶层的操作的避风港：如定时器，请求，监听


- 版本的变迁：
  1. 把子组件的event对象传给父组件 导致两边都要ReactEvent，可读性大大下降
  2. 子组件中添加了私有的状态 editingName onChange  自己修改 提交父组件时只需要给值就好
  3. 将私有状态提升到父组件，通过props传过来，onChange修改editingName
  子组件没有状态，性能更好，就负责展示。

## useEffect
副作用 hook
- 挂载后 mounted
- 更新后 updated
- 卸载前 打扫工作

## 前端本地存储
- 浏览器 有区间 存内容
  - 浏览器缓存静态资源
  - localStorage key：value 5M左右
    - setItem(key , 字符串（JSON.stringify）)
    - getItem(key)可能为null
  - 前端也有类Mysql 数据库 存更多数据

## useEffect
生命周期
- 挂载后mounted []
- 挂载及更新后 [参数]
- 挂载，任何项更新都指向
  那么第二个参数不传
- 卸载前  清理内存

- useEffect 卸载前的副作用
在函数里面写个return () =>{}
大白话就是：当某个组件只在特定的时间出现和消失，那么在它消失的时候可以通过useEffect把定时器或者其他的删除掉
不然会发生内存泄漏
  useEffect(() => {
     const Interval =  setInterval(() => {
        console.log('interval , is here');
      }, 2000);
      **return () => {
        console.log('组件卸载前执行，做什么内存清理工作');
        clearInterval(Interval)
      }**
    }
      , [])
  

