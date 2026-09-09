//  子进程
 import{
    spawn
 } from 'node:child_process';

// child process 做完后，IPC（进程间的通信 Inter process Communication）告诉主进程

const command = 'ls -al';//command linux命令 shell脚本
//切一下，第一项 cmd ，rest运算符 所有参数数组
const [cmd , ...args] = command.split(' ');
const cwd = process.cwd();//当前工作目录
//开启子进程
const client = spawn(cmd , args, {
    cwd,//工作目录
    //node 运行会申请这个资源，
    //bash 也会申请这个资源，
    //子线程继承父进程的输入输出，直接显示在当前控制台
    stdio:'inherit',//命令
    shell:true

});

let errorMsg = '';
client.on('error' , (err) => {
    errorMsg = err.message
});
client.on('close' , (code) => {
    if(code === 0){//运行顺利，成功退出
        process.exit(0);
    }else{
        if(errorMsg){
            console.error(`错误：${errorMsg}`);            
        }
        process.exit(code || 1);
    }
}); 