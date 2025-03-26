const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const hotelRoutes = require("./routes/Hotel"); // Hotel routes
const tourRoutes = require("./routes/tours"); // Tour routes
const PORT = 3000;

const app = express();

// CORS configuration
app.use(cors({ origin: true, credentials: true }));

// Database connection
dbconnection(); // Assuming you have a `database.js` file that handles MongoDB connection

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., images uploaded to the 'uploads' directory)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/hotels", hotelRoutes); // Hotel routes

app.use("/api/tours", tourRoutes); // Tour routes

// Default route
app.get("/", (req, res) => res.send("HELLO WORLD"));

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
