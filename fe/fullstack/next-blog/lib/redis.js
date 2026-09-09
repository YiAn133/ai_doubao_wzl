import Redis from 'ioredis'
const redis = new Redis("127.0.0.1:6379");
const initialData = {
    // hash：key 字符串ID ， 值 note的序列化字符串
    // key ： value
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}
export async function getAllNotes() {
    const data = await redis.hgetall("notes");
    // 接受一个对象返回一个数组[]
    if(Object.keys(data).length === 0){
        redis.hset("notes" , initialData);
    }
    return await redis.hgetall("notes");
}