function sleep(t){

    const p = new Promise((resolve , reject) => {
        setTimeout(() =>{
            resolve();
        } , t);
    });
    return p;
}

sleep(2000).then(
    () => {
        console.log("2秒后执行");
    }
);
