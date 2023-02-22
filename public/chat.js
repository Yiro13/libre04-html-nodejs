//Make connection
var socket = io.connect('https://live-super-chat.herokuapp.com');

//Query DOM
var mensaje = document.getElementById('mensaje');
    handle = document.getElementById('handle');
    boton = document.getElementById('enviar');
    salida = document.getElementById('salida');
    feedback = document.getElementById('feedback');

//Emit events
boton.addEventListener('click', function(){
    socket.emit('chat', {
        mensaje: mensaje.value,
        handle: handle.value
    })
});

mensaje.addEventListener('keypress', function(){
    socket.emit('escribiendo', handle.value);
});

//Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    salida.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.mensaje + '</P>'; 
});

socket.on('escribiendo', function(data){
    feedback.innerHTML = '<p><em>' + data + 'está escribiendo un mensaje...</em></p>';
});
