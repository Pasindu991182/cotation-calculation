const express = require("express");
const dbconnection = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes= require("./routes/tours")
const PORT = 3000;

const app = express();
app.use(cors({origin:true,Credential:true}))

//dbconnection

dbconnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=> res.send("HELLOW WORLD"));
app.use("/api/tours",routes);


app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))