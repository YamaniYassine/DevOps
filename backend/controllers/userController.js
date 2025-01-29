const User = require("../models/userModel");

exports.createUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Create user route does not exist yet",
    });
  };
  
  exports.getUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Get user route does not exist yet",
    });
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };