function f1(){
    const p = new Promise((resolve , reject) => {
        //关键代码
        is = true;
        if(is){
            resolve("成功执行任务1....")
        }else{
            resolve("任务1失败");
        }
    });
    return p;
}


async function main(){
    console.log("开始任务");
    const p =  await f1();
    console.log(p);
    console.log("结束任务");
}

main();