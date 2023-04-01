const mongoose = require("mongoose");
const validator = require("validator");



const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password is shorter than the minimum length(8)"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password!"],
      // this runs only save() or create()
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords don't match",
      },
    },
    role: {
        type: Number,
        default: process.env.ROLE_USER, 
    },

  },{timestamps: true});

  const User = mongoose.model("User", userSchema);
  module.exports = User;