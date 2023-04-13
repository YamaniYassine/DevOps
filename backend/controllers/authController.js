const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHanlder");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
// const Email = require("../utils/handleEmail");

const generateToken = (userid) => {
  const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  });

  // const token = generateToken(newUser._id);

  const user = {
    name: newUser.name,
    email: newUser.email,
    _id: newUser._id,
    role: newUser.role,
  };

  res.status(200).json({
    status: "success",
    data: {
      user: user,
      // token: token,
    },
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if the email and the password
  // if (!email || !password) {
  //   return next(new AppError("Email and Password are required!"), 400);
  // }

  if (!email || !password) {
    let message = {};

    if (!email) {
      message.email = "Email is required!";
    }

    if (!password) {
      message.password = "Password is required!";
    }
    return next(new AppError(JSON.stringify(message)), 400);
  }

  //2. check if the user exists, and the password is correct
  const user = await User.findOne({ email: email });
  let allErrors = {};
  allErrors[`incorrectinfo`] = `Email or password incorrect`;

  if (!user || !(await user.comparePassword(password))) {

    return next(new AppError(JSON.stringify(allErrors), 400));
  }

  // 3. generate token send it to the client
  const token = generateToken(user._id);

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: process.env.JWT_EXPIRES_IN,
    secure: process.env.NODE_ENV === 'production',
  });


  res.status(200).json({
    status: "success",
    data: {
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role
      },
      token: token,
    },
  });
});
