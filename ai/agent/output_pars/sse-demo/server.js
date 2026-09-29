const http = require('http');
const server = http.createServer((req , res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 可选，处理预检OPTIONS请求
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(req.url === '/'){
        res.writeHead(200 , {
        'Content-Type':'text/plain',
        })
        res.end('hello world')
    }else if(req.url === '/stream'){
         res.writeHead(200 , {
        'Content-Type':'text/event-stream',
        'cache-control': 'no-cache',
        'connection':'keep-alive'
        })
        let words = ['你','好','欢','迎']
        let index = 0;
        const timer = setInterval(() => {
            if(index >= words.length){
                clearInterval(timer);
                res.end();
                return ;
            }   
            res.write(`data: ${words[index]}\n\n`)
            index++
        } , 1000)
    }
})

server.listen(3000 , () => {
    console.log('server is running on port 3000')
})