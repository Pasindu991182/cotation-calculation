const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;
const app = express();

// CORS configuration
app.use(cors({ origin: true, credentials: true }));

// Database Connection
dbconnection();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const guideR= require("./routes/g")
const tourRoutes = require("./routes/tours");
const transportRoutes = require("./routes/transport");


app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/tours", tourRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/guide", guideR);


// Start Server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
app.get("/",(req,res)=> res.send("HELLOW WORLD"));


app.use(express.json());


