const express = require('express');
const Ticket = require('../models/ticketModel');
const Winner = require("../models/winnerModel");
const router = express.Router();

router.get('/check-ticket/:ticketCode', async (req, res) => {
    const ticketCode = req.params.ticketCode;
  
    try {
      const ticket = await Ticket.findOne({ number: ticketCode });
  
      if (!ticket) {
        return res.json({ success: false, message: 'Invalid ticket code' });
      }
  
      if (ticket.used) {
        return res.json({ success: false, message: 'Ticket already used' });
      }
  
      res.json({ success: true, ticket });
    } catch (error) {
      console.error('Error checking ticket:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  router.post('/mark-ticket-used/:ticketCode', async (req, res) => {
    const ticketCode = req.params.ticketCode;
  
    try {
      const ticket = await Ticket.findOne({ number: ticketCode });
  
      if (!ticket) {
        return res.json({ success: false, message: 'Invalid ticket code' });
      }
  
      if (ticket.used) {
        return res.json({ success: false, message: 'Ticket already used' });
      }
  
      ticket.used = true;
      await ticket.save();
  
      res.json({ success: true, message: 'Ticket marked as used' });
    } catch (error) {
      console.error('Error marking ticket as used:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });   

  router.post("/add-winner", async (req, res) => {
    const { name, email, ticketCode, prize } = req.body;
  
    try {
      const winner = await Winner.create({ name, email, ticketCode, prize });
      res.json({ success: true, message: "Winner added successfully", winner });
    } catch (error) {
      console.error("Error adding winner:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

module.exports = router;
