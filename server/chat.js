//node Server which will handle socket io connections
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, { cors: true });

// const user = {},

io.on('connection', socket => {
    //if new user is connected , so let other user know about that!
    // socket.on('new-user-joined', name => {
    //users[socket.id] = name;
    //     socket.broadcast.emit('user-joined', name);
    // });
    console.log('user-joined')
    //if someone sends the message broadcast it to others.
    socket.on('message', message => {
        console.log(message)
        // socket.broadcast.emit('msg', { message: message, name: users[socket.id] });
        socket.broadcast.emit('msg',message)
    });
    //if someone left the chat
    socket.on('disconnect', function () {
        console.log('user disconnect')
        // socket.broadcast.emit('leftChat', socket.handshake.query);
        // delete users[socket.id];
    });
});

http.listen(3000, function(){
    console.log('聊天室启动成功');
});