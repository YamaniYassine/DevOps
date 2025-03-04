const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    lowercase: true,
  },
  ticketCode: {
    type: String,
    required: [true, "Ticket code is required!"],
    unique: true,
  },
  prize: {
    type: String, // Adjust the data type based on your prize structure
  },
  status: {
    type: String,
    enum: ["en cours de traitement", "gain reçu"],
    default: "en cours de traitement"
  },
});

const Winner = mongoose.model("Winner", winnerSchema);

module.exports = Winner;