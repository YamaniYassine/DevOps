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

  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };