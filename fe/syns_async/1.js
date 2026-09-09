const p = new Promise((resolve , reject) => {
    console.log("开始");
    
    //耗时性任务的
    setTimeout(() => {
        resolve(666);
    } , 2000);
    console.log("哈哈哈");
    
});
console.log(p.__proto__);
p.then((data) => {
    console.log(data);
    
    console.log("end");
    
}).catch(() => {
    console.log("失败");
});

