const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const promClient = require("prom-client");

dotenv.config({ path: "./config.env" });

// utils
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/globalErrorController");

const port = process.env.PORT;
const dbURI = process.env.DATABASE;

// Prometheus metrics
const register = new promClient.Registry();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });

app.get("/metrics", (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(register.metrics());
});

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
const ticketRoutes = require('./routes/ticketRoutes');

app.use(`/users`, userRoutes);
app.use('/ticketApi', ticketRoutes);

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
