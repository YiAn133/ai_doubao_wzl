// 利用rag实现语义化搜索
import fs from 'fs/promises'
import {client} from './app.service.mjs'
import readline from 'readline';//node 内置的 读取标准输入

const inpputFilePath = './posts-demo/data/posts-embedding.json'
const data = await fs.readFile(inpputFilePath , 'utf-8');
const posts = JSON.parse(data);

//命令行交互
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const cosineSimilarity = (v1, v2) => {
  // 计算向量的点积
  const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0);

  // 计算向量的长度
  const lengthV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr * curr, 0));
  const lengthV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr * curr, 0));

  // 计算余弦相似度
  const similarity = dotProduct / (lengthV1 * lengthV2);

  return similarity;
};

const handleInput = async (answer) => {
    console.log(answer);
    //得到问题的embedding
    const response = await client.embeddings.create({
        model:'text-embedding-v4',
        input:answer
    })
    const {embedding} = response.data[0];
    //遍历数组，找到和问题embedding最相关的数据
    //相识度排名第几的数据
    const results = posts.map(item => ({
        ...item,
        similarity:cosineSimilarity(item.embedding,embedding)
    })).sort((a,b) => a.similarity - b.similarity).reverse().slice(0,3).map((item , index) => `${index + 1}.${item.title}.${item.category}`).join('\n');
    console.log(`\n搜索结果:\n ${results}`);
    

    rl.question('\n请输入你要搜索的内容:', handleInput);
}


rl.question('\n请输入你要搜索的内容:',handleInput);

