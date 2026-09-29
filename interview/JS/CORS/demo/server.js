const WebSocket = require('ws')
const http = require('http')
const server = http.createServer((req , res) => {
    res.writeHead(200 , {
        'Content-Type':'text/plain'
    })
    res.end('WebSocket Server Running!!!')
})

const ws = new WebSocket.Server({server,path:'/ws'})
// 监听事件
ws.on('connection' , (ws) => {
    console.log('Client connected');
    ws.on("message" , (message) => {
        console.log(`Received messages:${message}`);
        ws.send(`Server received:${message}`)
    })
})

server.listen(3000 , () => {
    console.log('listening on http://localhost:3000');
})

