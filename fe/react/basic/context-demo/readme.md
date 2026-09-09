# useContext(上下文)

## 组件通信
- 父子组件通信
- 兄弟关系
- 爷孙关系


## 组件层次比较深
- useContent 上下文
- 提供数据上下文
- 消费上下文

## useContext
useContext 可以跨层级直接读取组件上下文数据，省去逐层向下传递Props。

## 使用步骤
1. createContext 创建上下文
2. Provider 组件包裹子组件
3. useContext 消费上下文

就是外面有一个祖宗标签，必须有Provider ，然后设置value值，没有，就是祖宗标签里面默认的值
<MyCtx.Provider value={{name:'张三', age:18}}>
  <ChildA/>
  <ChildB/>
</MyCtx.Provider>

## 自定义hooks
    - use开头的函数
    - 自定义的hooks目录下，属于架构
    - 封装了响应式，副作用等功能，说白了就是在多个组件中要复用，避免冗余

## 监听鼠标移动事件，鼠标坐标显示在页面上
- 抽象的响应式的鼠标坐标
    - 封装到hooks目录下，可以进行复用。
        **之所以不封装成组件，是因为hooks只是返回数据和状态的，组件是返回UI界面和数据的**