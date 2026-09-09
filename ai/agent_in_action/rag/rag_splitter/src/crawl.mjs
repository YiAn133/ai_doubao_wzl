// 网页爬虫，并解析其中的指定部分，css 选择器
import axios from 'axios'//标准http请求库
// esm export defalut 只能向外暴露 1个  export 能向外面暴露多个
//  * as 都导入挂载到cheerio上
import * as cheerio from 'cheerio';
// 向url 发送 http请求，返回html字符串
// 然后再去拿其中的一部分，用cherrio
// cherrio 负责 在内存中，把html字符串 解析为DOM树
// 因为返回的只是html字符串，无法获得DOM对象，故而需要cherrio

// 例子
const tagetUrl = 'https://juejin.cn/post/7660707431753678854' 

async function  crawPage() {
    try{
        const {data: html} = await axios.get(tagetUrl);
        console.log(html);//html字符串
        // cheerio 的2步
        //1.html 字符串在命令行中运行，内存中虚拟化一个DOM 对象出来
        // Document 对象 即树状结构，分配一个进程，申请比较打的内存空间
        //2.css selector 树里查找
        // cheerio 可以让js 开发者，
        // 用前端思维，简单高效完成指定url，指定部分的爬取工作，不需要用正则
        const $ = cheerio.load(html);//dom对象
        const pageContent = $(`.main-area p`).text();
        console.log(pageContent);
        
    }catch(e){

    }
}

crawPage();