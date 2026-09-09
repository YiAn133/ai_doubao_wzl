// 如何把.env文件中apiKey   读取进来？
//利用dotenv 
import dotenv from 'dotenv'
import { OpenAI} from 'openai';
dotenv.config()

const main = async function () {
    console.log('程序开始运行');
    setTimeout(function(){
        console.log('1秒后运行');
    } , 1000)
    console.log('程序结束');
    
    
}
main();
