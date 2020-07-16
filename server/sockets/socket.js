const { io } = require("../server");
const { TicketCrontrol } = require("../classes/ticket-control");

const ticketCrontrol = new TicketCrontrol();

io.on("connection", (usuario) => {
    console.log("usuario conectado");

    // usuario.on("disconnect", () => {
    //     console.log("Usuario desconectado");
    // });

    usuario.on("nextTicket", (data, callback) => {

        ticketNumber = ticketCrontrol.nextTicket();

        callback(ticketNumber);

        console.log('Ticket => ', ticketNumber);
    });


    usuario.emit('currentTicket', {
        actual: ticketCrontrol.getcurrentTicket(),
        lastFour: ticketCrontrol.getLastFour()
    });

    usuario.on('assignTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let assignTicket = ticketCrontrol.assignTicket(data.desktop);
        callback(assignTicket);

        usuario.broadcast.emit('currentTicket', {
            actual: ticketCrontrol.getcurrentTicket(),
            lastFour: ticketCrontrol.getLastFour()
        });
    });

});