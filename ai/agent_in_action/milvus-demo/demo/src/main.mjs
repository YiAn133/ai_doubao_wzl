import{
    logger,
    MilvusClient,
    // 索引的类型
    // Milvus 存的是高维向量，
    // 没有索引时，每次查询都要把库里的向量和查询向量逐一算相似度
    //数据量大了，慢的没法用
    // 字典 拼音 偏旁的索引，迅速减少查询范围
    // IVF_FLAT 聚簇索引 毫秒级别
    IndexType,
    // 相似度的计算类型
    MetricType
} from '@zilliz/milvus2-sdk-node'
import 'dotenv/config'

// 云端地址
const ADDRESS = process.env.MILVUS_ADDRESS;
// api key
const TOKEN = process.env.MILVUS_TOKEN;


async function  main() {
    const client = new MilvusClient({
        address:ADDRESS,
        token:TOKEN
    })
    console.log('正在连接 zilliz cloud...');
    const checkHealth = await client.checkHealth();
    if(!checkHealth.isHealthy){
        console.error('连接失败',checkHealth.reasons);
        return;
    }
    console.log('连接成功，集群状态正常');
    // 在mysql 叫table
    // 在Milvus 叫集合 
    const COLLECTION_NAME = 'test';
    const DIMESION = 4;//维度
    try{
        // // 类似建表
        // await client.createCollection({
        //     collection_name:COLLECTION_NAME,
        //     dimension:DIMESION,
        //     auto_id:true
        // });
        // console.log('集合创建成功');
        // // 建索引，让查询更块
        // await client.createIndex({
        //     collection_name:COLLECTION_NAME,
        //     field_name:'vector',//给某字段建索引
        //     index_type:IndexType.AUTOINDEX,
        //     metric_type:MetricType.COSINE
        // })
        // console.log('索引创建成功！');
        

        // 插入数据
        // const data = [
        //     // 一行
        //     // 相比mtsql 宽松，开源再插入数据时建立字段
        //     {vector:[0.1,0.2,0.3,0.4] , content:'这是第一条数据'},
        //     {vector:[0.5,0.6,0.7,0.8] , content:'这是第二条数据'}
        // ]
        // const inserRes = await client.insert({
        //     collection_name:COLLECTION_NAME,
        //     data:data
        // })
        // console.log('插入成功',inserRes.IDs);
        

        // 查询数据
        const searchRes = await client.search({
            collection_name:COLLECTION_NAME,
            data:[[0.1,0.1,0.3,0.4]],
            limit:2,
            output_fields:['content']
        })
        console.log(JSON.stringify(searchRes.results , null , 2));
        

        
    }catch(err){
        console.log('集合可能存在或创建出错',err.message);
    }
}

main().catch(console.error);

