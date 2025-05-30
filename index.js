import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const PORT=3005

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling'],
});

// wr
io.on('connection', (socket)=>{
    console.log("New client connected", socket.id);

    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', "hello from server");
    });
})



app.get('/', (req, res)=>{
    res.send('Hello, World!');
})

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})