const fs = require("fs");

class Ticket {
    constructor(numero, desktop) {
        this.numero = numero;
        this.desktop = desktop;
    }
}

class TicketCrontrol {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.setDataTickets();
    }

    setDataTickets() {
        let data = require("../data/data.json");

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetcount();
        }
    }

    nextTicket() {
        this.ultimo += 1;
        this.saveToFile();

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        return `Ticket ${this.ultimo}`;
    }

    resetcount() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveToFile();
    }

    getcurrentTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    assignTicket(desktop) {
        if (this.tickets.length == 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let takeTicket = new Ticket(numeroTicket, desktop);

        this.lastFour.unshift(takeTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1);
        }

        this.saveToFile();
        return takeTicket;
    }

    saveToFile() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }
}

module.exports = {
    TicketCrontrol,
};