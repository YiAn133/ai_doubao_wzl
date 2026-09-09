# useState
- 响应式数据状态
- hooks 函数式编程
- （）里面的参数 可以是初始值也可以是函数
- 返回值是数组[state,setState]


## Fragment 组件


## 异步
setCount是异步调度更新，不会立刻修改count.调用后，当前作用域count任然是旧值，等**本轮**代码执行完毕，组件渲染才拿
新count

- useState(初始值|函数)用于应对不同的初始场景
函数就是复杂情况，1000个用户，只会渲染一次
const【users】 = useState（函数名（））
<!-- 这个好  只会渲染一次-->
const 【users】 = useState（（） => 函数名()）
