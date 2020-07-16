var socket = io();
var lblNuevoTicket = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Escritorio conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});


var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario en esta pantalla');
}

var desktop = searchParams.get('escritorio');
var labelTicket = $('small');

$('h1').text('Escritorio ' + desktop);

$('button').on('click', function() {
    socket.emit('assignTicket', { 'desktop': desktop }, function(response) {
        console.log(response);

        if (response === 'No hay tickets') {
            labelTicket.text(response);
            return;
        }

        labelTicket.text('Ticket ' + response.numero);
    });
});