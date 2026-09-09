## 理解Promise
- 实例化Promise后 这个Promise是一个状态机  用来存放里面的异步任务 成功完成 还是失败
Promise 是一个一次性的状态机容器，用来标准化托管异步任务的结果。
实例化时同步执行内部代码，遇到异步 API 就交给运行环境处理；
then 方法会根据 Promise 状态决定：pending 时暂存回调，状态变更后将回调推入微任务队列，等待合适的时机执行

resolve(xxx) 里传入的值，会作为 Promise 的成功结果，最终传递给 .then() 第一个回调的参数，这就是 data 能拿到 666 的原因。
同理，如果调用 reject(xxx)，xxx 会作为失败原因，传递给 .catch() 的回调参数。