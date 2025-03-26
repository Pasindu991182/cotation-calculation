const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const tourRoutes = require("./routes/tours");
const transportRoutes = require("./routes/transport");

const PORT = 3000;
const app = express();

// Enable CORS
app.use(cors({ origin: true, credentials: true }));

// Database Connection
dbconnection();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("HELLO WORLD"));
app.use("/api/tours", tourRoutes);
app.use("/api/transport", transportRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
