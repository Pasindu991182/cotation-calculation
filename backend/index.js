const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const tourRoutes= require("./routes/tours")
const PORT = 3000;
const guideRoutes= require("./routes/guide")
//const cors = require("cors");


const app = express();


app.use(cors({origin:true,Credential:true}))

// CORS configuration
app.use(cors({ origin: true, credentials: true }));

// Database connection
dbconnection();

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(cors({ origin: true, credentials: true }));

app.get("/",(req,res)=> res.send("HELLOW WORLD"));
app.use("/api/tours",tourRoutes);

//app.get("/", (req,res) => req.send("Hello World"));
app.use("/api/guide", guideRoutes);

app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))

// Routes
app.use("/api/tours", routes);

