// posts.json 向量化
//node 内置的fs模块  读取文件到内存
//JSON.parse（）变成一个数组后 每一项 await embedding 加到json数组中
//写入文件embedding 长期存储

import fs from 'fs/promises';//promise 的fs模块
import {client} from './app.service.mjs';

//上下文的路径
const inputFilePath = './posts-demo/data/posts.json';
const outputFilePath = './posts-demo/data/posts-embedding.json';

//读取json文件文本
const data = await fs.readFile(inputFilePath , 'utf-8');

//转变为JSON数组
const posts = JSON.parse(data);
const sleep = (ms) => {
    return new Promise(reslove => setTimeout(reslove , ms));
}


const postWithEmbedding = [];

for(const {title , category} of posts){
    console.log(title , category , 'embedding');
    
    const response = await client.embeddings.create({
        model:'text-embedding-v4',
        //语义更准确，可以细致的语义匹配
        input:`标题：${title},分类:${category}`
    })
    postWithEmbedding.push({
        title,
        category,
        embedding:response.data[0].embedding
    })
    await sleep(200);
}

await fs.writeFile(outputFilePath , JSON.stringify(postWithEmbedding , null , 2));