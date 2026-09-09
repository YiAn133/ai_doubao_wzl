
// self 关键字：等价于this，当前子线程全局对象
self.onmessage = (e) => {
    const {num}  = e.data;
    console.log('Worker收到主线程任务,参数为:',e.data);
    let sum = 0;
    for(let i = 0 ; i < 5000000000 ; i++){
        sum += num * i;
    }
    // 向主线程发送信息
    self.postMessage({
        result: sum
    })
} 