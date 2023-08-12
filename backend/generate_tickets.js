const mongoose = require('mongoose');
const Ticket = require('./models/ticketModel');
const dbURI = process.env.DATABASE;

// Connectez-vous à votre base de données
mongoose.connect('mongodb://127.0.0.1:27017/PFE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateTickets = async () => {
  const totalTickets = 150; // Nombre total de tickets
  const ticketData = [];

  for (let i = 1; i <= totalTickets; i++) {
    const randomAmount = Math.random() * 100 + 49; // Montant aléatoire supérieur à 49
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

    ticketData.push({
      number: i,
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

  // Déconnectez-vous de la base de données après avoir terminé
  mongoose.disconnect();
};

generateTickets(); // Appelez la fonction pour générer et stocker les tickets
