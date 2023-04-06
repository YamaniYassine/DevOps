const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// utils
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/globalErrorController");

const port = process.env.PORT || 3001;
const dbURI = process.env.DATABASE;
// DB connection
 mongoose.connect(dbURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 });
 const status = mongoose.connection;
 status.on('error', console.error.bind(console, 'error'));
 status.once('open', () => { 
   console.log('mongoDB connected!');
 });

app.use(express.json());
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

//Routes
const userRoutes = require("./routes/userRoutes");

app.use(`/users`, userRoutes);







 app.get("/", (req, res) =>{
    res.status(200).json({message: "hello from server.js"});
 }); 



 // handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the route ${req.originalUrl}`, 404));
});

// global error handler
app.use(globalErrorController);


app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});