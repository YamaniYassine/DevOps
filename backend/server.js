const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const client = require("prom-client");

dotenv.config({ path: "./config.env" });

// utils
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/globalErrorController");

const port = process.env.PORT;
const dbURI = process.env.DATABASE;

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collect default metrics

// Create a custom histogram for request durations
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
});

// Create a custom counter for total requests
const totalRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// Middleware to collect metrics for each request
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    };
    end(labels);
    totalRequests.inc(labels);
  });
  next();
});

// DB connection
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const status = mongoose.connection;
status.on("error", console.error.bind(console, "error"));
status.once("open", () => {
  console.log("mongoDB connected!");
});

app.use(express.json());
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

// Routes
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

app.use(`/users`, userRoutes);
app.use("/ticketApi", ticketRoutes);

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server.js" });
});

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the route ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalErrorController);

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

module.exports = app;
