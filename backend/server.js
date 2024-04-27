const express = require("express");
const promClient = require('prom-client');
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// utils
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/globalErrorController");

const port = process.env.PORT;
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

// Create a Prometheus Registry
const register = new promClient.Registry();

// Enable collection of default metrics
promClient.collectDefaultMetrics({ register });

// Define a custom metric
const customMetric = new promClient.Gauge({
  name: 'custom_metric',
  help: 'Example custom metric',
  registers: [register]
});

// Increment the custom metric
customMetric.inc(1);

// Expose Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});




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
