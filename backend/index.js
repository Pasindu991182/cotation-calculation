const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;
const guideRoutes= require("./routes/guide")

const guideR= require("./routes/g")
//const cors = require("cors");


const app = express();


// CORS configuration
app.use(cors({ origin: true, credentials: true }));

// Database connection
dbconnection();

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(cors({ origin: true, credentials: true }));

app.get("/",(req,res)=> res.send("HELLOW WORLD"));



///////////////////////////////////////change shan///////////////////////////////////////

//app.use("/api/guide", guideRoutes);

app.use(cors());
app.use(express.json());
app.use("/api/guide", guideR);
app.use("/uploads", express.static("uploads"));
//////////////////////////////////////////////////////////////////////////////

app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))

// Routes


