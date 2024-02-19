const mongoose = require('mongoose');
const Ticket = require('./models/ticketModel');
const crypto = require('crypto');
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const dbURI = process.env.DATABASE;


mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateTickets = async () => {
  const totalTickets = 150; // Nombre total de tickets
  const ticketData = [];

  for (let i = 1; i <= totalTickets; i++) {
    const randomAmount = Math.random() * 100 + 49;
    let gain;

    // Logique pour déterminer le gain en fonction de la répartition
    if (i <= totalTickets * 0.6) {
      gain = 'infuser';
    } else if (i <= totalTickets * 0.8) {
      gain = 'detox';
    } else if (i <= totalTickets * 0.9) {
      gain = 'signature';
    } else if (i <= totalTickets * 0.96) {
      gain = 'coffret39';
    } else {
      gain = 'coffret69';
    }

    // Générez un numéro de ticket unique à 10 chiffres en utilisant crypto
    const ticketNumber = crypto.randomBytes(5).toString('hex');

    ticketData.push({
      number: ticketNumber,
      amount: randomAmount.toFixed(2),
      gain: gain,
    });
  }

  try {
    await Ticket.insertMany(ticketData);
    console.log('Tickets générés et stockés avec succès');
  } catch (error) {
    console.error('Erreur lors de la génération et du stockage des tickets', error);
  }

  mongoose.disconnect();
};

generateTickets();
