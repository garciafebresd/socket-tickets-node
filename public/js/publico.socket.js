var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});


socket.on('currentTicket', function(data) {
    console.log(data);

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateDataHtml(data.lastFour);
});


function updateDataHtml(lastFour) {
    for (let index = 0; index < lastFour.length; index++) {
        const element = lastFour[index];
        lblTickets[index].text('Ticket ' + lastFour[index].numero);
        lblEscritorios[index].text('Escritorio ' + lastFour[index].desktop);
    }
}