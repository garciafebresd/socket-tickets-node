var socket = io();
var lblNuevoTicket = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});


socket.on('currentTicket', function(response) {
    lblNuevoTicket.text(response.actual);
});

$('button').on('click', function() {
    lblNuevoTicket.text('Cargando...');
    socket.emit('nextTicket', null, function(nextTicket) {
        lblNuevoTicket.text(nextTicket);
    });
});