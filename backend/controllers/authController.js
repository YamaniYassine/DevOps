const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHanlder");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const generateToken = (userid) => {
  const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log('Signup started'); // Add this log to track if signup is being called

  // Check for missing fields
  if (!name || !email || !password || !confirmPassword) {
    let errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }

    console.log('Missing fields:', errors); // Log the errors to check if they're triggering

    return next(new AppError(JSON.stringify(errors), 400));
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    let allErrors = {};
    allErrors[`incorrectconfirmation`] = `passwords don't match`;
    console.log('Passwords do not match:', allErrors); // Log if passwords don't match
    return next(new AppError(JSON.stringify(allErrors), 400));
  }

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    let allErrors = {};
    allErrors[`alreadyused`] = `emal already used`;
    console.log('Email already in use:', allErrors); // Log if email is already used
    return next(new AppError(JSON.stringify(allErrors), 400));
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  console.log('User created:', newUser); // Log the new user creation

  // Generate token
  const token = generateToken(newUser._id);

  // Set token as cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.JWT_EXPIRES_IN,
    secure: process.env.NODE_ENV === "production",
  });

  // Send success response
  console.log('Sending response'); // Log before sending response
  res.status(200).json({
    status: "success",
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
        role: newUser.role,
      },
      token: token,
    },
  });
});



exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;



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
