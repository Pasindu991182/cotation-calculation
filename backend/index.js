const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/tours");
const PORT = 3000;

const app = express();

// CORS configuration
app.use(cors({ origin: true, credentials: true }));

// Database connection
dbconnection();

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., images uploaded to the 'uploads' directory)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/tours", routes);

// Default route
app.get("/", (req, res) => res.send("HELLO WORLD"));

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
