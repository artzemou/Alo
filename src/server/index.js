'use strict';
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res, next) =>

	res.sendFile(__dirname + './index.html')
);


io.on('connection', (socket) => {
    console.log(socket.id);
		socket.emit('hello',{message: 'hello from server!'})
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});

server.listen(port);
