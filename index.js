var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 4000;

//App setup
var app = express();
var server = app.listen(PORT, function(){
    console.log('Char server running');
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('creada la coneccion de socket', socket.id)

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('escribiendo', function(data){
        socket.broadcast.emit('escribiendo', data)
    });
});