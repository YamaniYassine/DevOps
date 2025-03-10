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

    return next(new AppError(JSON.stringify(errors), 400));
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    let allErrors = {};
    allErrors[`incorrectconfirmation`] = `passwords don't match`;
    return next(new AppError(JSON.stringify(allErrors), 400));
  }

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    let allErrors = {};
    allErrors[`alreadyused`] = `emal already used`;
    return next(new AppError(JSON.stringify(allErrors), 400));
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  // Generate token
  const token = generateToken(newUser._id);

  // Set token as cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.JWT_EXPIRES_IN,
    secure: process.env.NODE_ENV === "production",
  });

  // Send success response
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

exports.addEmployee = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if the request comes from an admin
  // if (!req.user || req.user.role !== 1) {
  //   return next(new AppError("Unauthorized! Only admins can add employees.", 403));
  // }

  // Validate fields
  if (!name || !email || !password || !confirmPassword) {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm Password is required";

    return next(new AppError(JSON.stringify(errors), 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError(JSON.stringify({ incorrectconfirmation: "Passwords don't match" }), 400));
  }

  // Check if email is already used
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError(JSON.stringify({ alreadyused: "Email already used" }), 400));
  }

  // Create employee with role 2
  const newEmployee = await User.create({
    name,
    email,
    password,
    confirmPassword,
    role: 2, // Explicitly setting role to 2 for employees
  });

  // Generate token for the new employee
  const token = generateToken(newEmployee._id);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        name: newEmployee.name,
        email: newEmployee.email,
        _id: newEmployee._id,
        role: newEmployee.role,
      },
      token: token,
    },
  });
});

exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
  const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;

  // Ensure the current password is provided
  if (!currentPassword) {
    return next(new AppError("Current password is required", 400));
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if current password is correct
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new AppError("Current password is incorrect", 401));
  }

  // Update name and email if provided
  if (name) user.name = name;
  if (email) user.email = email;

  // If a new password is provided, validate it
  if (newPassword) {
    if (newPassword !== confirmNewPassword) {
      return next(new AppError("New passwords do not match", 400));
    }
    user.password = newPassword;
  }

  delete req.body.confirmPassword;

  await user.save();

  // Optionally generate a new token if needed
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      },
      token,
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
