const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
  },
  ticketCode: {
    type: String,
    required: [true, "Ticket code is required!"],
    unique: true,
  },
  prize: String,
});

const Winner = mongoose.model("Winner", winnerSchema);

module.exports = Winner;