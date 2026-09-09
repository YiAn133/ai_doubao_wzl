import "dotenv/config";
import{ parse } from 'path';//path解析路径得到文本
import{
    MilvusClient,
    DataType,
    MetricType,
    IndexType
} from '@zilliz/milvus2-sdk-node';

import{ OpenAIEmbeddings }from '@langchain/openai'
import{  EPubLoader } from '@langchain/community/document_loaders/fs/epub';
import{ RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import Module from "module";
import { error } from "console";

// 踩坑！
// 第一epub中一个压缩包，我们需要安装epub2包，获得里面的内容
// 第二解析的内容是一大堆html ， 我们需要安装html-to-text包，把内容（html）变为text文本


const COLLECTION_NAME = 'ebook';
const VECTOR_DIM = 1024;
const CHUNK_SIZE = 500;
// mjs中相对路径是对于终端而言的
const EPUB_FILE = './天龙八部.epub';
// 云端地址
const ADDRESS = process.env.MILVUS_ADDRESS;
// api key
const TOKEN = process.env.MILVUS_TOKEN;

const {name: BOOK_NAME} = parse(EPUB_FILE);
console.log(BOOK_NAME);

//embeddings初始化
const embeddings = new OpenAIEmbeddings({
    apiKey:process.env.OPENAI_API_KEY,
    model:process.env.EMBEDDINGS_MODEL_NAME,
    configation:{
        baseURL:process.env.OPENAI_API_BASE_URL,
    },
    dimensions:VECTOR_DIM//让embedding分为这个维度
})

async function getEmbedding(text) {
     const results = await embeddings.embedQuery(text);
     return results;
}

//向量数据库的初始化
const client = new MilvusClient({
    address:ADDRESS,
    token:TOKEN,
})

// 判断表是否创建
async function  ensureCollection(bookId) {
    // 没有就建立
    // 有就忽略
    try{
        const hasCollection = await client.hasCollection({
            collection_name:COLLECTION_NAME
        });
        console.log(hasCollection.value);
        if(!hasCollection.value){
            console.log('创建集合');
            await client.createCollection({
                collection_name:COLLECTION_NAME,
                fields:[
                    {name:'id',data_type:DataType.VarChar,max_length:100,is_primary_key:true},
                    {name:'book_id' , data_type : DataType.VarChar , max_length : 100},
                    {name:'book_name' , data_type:DataType.VarChar , max_length : 200},
                    //表示第几章
                    {name: 'chapter_num' , data_type : DataType.Int32 , },
                    // 表示第几个数据切片
                    {name: 'index' , data_type : DataType.Int32},
                    {name:'content' , data_type: DataType.VarChar , max_length:10000},
                    {name:'vector' , data_type : DataType.FloatVector , dim:VECTOR_DIM}
                    
                ],

            });
            console.log('集合创建成功');
            console.log('创建索引');
            await client.createIndex({
                collection_name:COLLECTION_NAME,
                field_name:'vector',
                index_type:IndexType.IVF_FLAT,
                metric_type:MetricType.COSINE,
                // nlist 是K-Means 聚类的簇数
                // 大白话：就是把向量进行区域化，分类
                // 只在IVF_FLAT中进行，因为数据量大，这样可以加速
                params:{nlist:1024}
            })
            console.log('索引创建成功');
            
            
        }
        // 细节捕捉错误
        try {
            await client.loadCollection({
                collection_name: COLLECTION_NAME
            });//通过Milvus 服务把数据加载到内存中，便于后续查询
            console.log('集合已经处于加载状态');
        } catch (err) {
            console.log('创建集合时出错');
        } 
        console.log('集合加载成功');
        
    }catch(err){

    }
}

// 把文档加载进来
// 这里有个妙点就是：我们在加载的时候通常用promise.all并发执行提高效率
// 但是如果数据过多，embeddings模型可能有问题
// 我们通常会把文本进行切块，分批次插入数据库中
async function loadAndProcessPubStreaming(bookId) {
    try{
        console.log(`\n开始加载EPUB文件：${EPUB_FILE}`);
        const loader = new EPubLoader(EPUB_FILE , {
            // 由于文本过大，按照章节进行生成document，epub中含有元数据，介绍章节分布
            // 按照章节进行生成document
            splitChapters:true
        });
        const documents = await loader.load();
        console.log(`加载完成，共${documents.length}个章节`);
      
        const textsplitter = new RecursiveCharacterTextSplitter({
            chunkSize:CHUNK_SIZE,
            // 没有用 separators，默认就是\n 。
            chunkOverlap:50//重叠50字符，保证上下文连惯性
        })
        let totalInserted = 0;//计数
        let documentsLen = documents.length;
        for(let chapterIndex = 0; chapterIndex < documentsLen  ; chapterIndex++){
            const chapter = documents[chapterIndex];
            const chapterContent = chapter.pageContent;
            console.log(`正常处理第${chapterIndex + 1} / ${documentsLen}章...`);
            // 进行切片
            // 通过切片得到的是字符串数组
            const chunks = await textsplitter.splitText(chapterContent);
            console.log(`拆分为${chunks.length}个片段`);
            if(chunks.length === 0){
                console.log(`跳过空章节\n`);
                continue;
            }
            console.log('生成向量并插入中....');
            const insertedCount = await inertChunksBatch(
                chunks,
                bookId,
                chapterIndex + 1
            );
            totalInserted += insertedCount;
            console.log(
                `已插入${insertedCount}条记录`
            );
        }
        console.log(`\n共插入${totalInserted}条记录\n`);
        return totalInserted;
    }catch(error){
        console.log('加载EPUB有问题！',error);
    }
}

//将一批chunk 插入向量数据库中 ,返回插入的数量
async function  inertChunksBatch(chunks , bookId , chapterNum) {
    try {
        if(chunks.length === 0){
            return 0;
        }
        const insertData = await Promise.all(
            // 这里从chunk是字符串
            chunks.map(async(chunk , chunkIndex) => {
                const vector = await getEmbedding(chunk);
                return {
                    id:`${bookId}_${chapterNum}_${chunkIndex}`,
                    book_id:bookId,
                    book_name:BOOK_NAME,
                    chapter_num:chapterNum,
                    index:chunkIndex,
                    content:chunk,
                    vector:vector
                }
            })
        )
        const insertResult = await client.insert({
            collection_name:COLLECTION_NAME,
            data:insertData
        });

        // insertResult.insert_cnt:返回插入成功的次数
        return Number(insertResult.insert_cnt) || 0;

    } catch (error) {
        console.log(`插入章节${chapterNum}的数据时出错:`,error.message);
        throw error;
    }
}


const main =async () => {
    try {
        console.log('='.repeat(80));
        console.log('电子书处理程序');
        console.log('='.repeat(80));
        console.log('\n连接Milvus....');
        await client.connectPromise;//等待握手
        console.log('已连接');
        const bookId = 1;
        // 确保集合建立了
        await ensureCollection(bookId);
        // 加载和处理EPUB文件
        // 一边切割一边embedding，一边存数据库
        await loadAndProcessPubStreaming(bookId);
        
    } catch (error) {
        
    }

}

main().catch(console.error);