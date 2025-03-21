const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
 tourGuideID : {
    type : String,
    required : true,
},

 name  : {
    type : String,
 },

 Contact : {
    type : Number,
    required : true,
 },

 language : {
    type : Array,
 },

 experience : {
    type : String,
 },

 charges : {
    type : Number,
    required : true,
 },
  
 photo : {
    type : String, 
 },
},

);

module.exports = mongoose.model("guide",guideSchema);