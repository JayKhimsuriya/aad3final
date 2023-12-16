const mongoose = require("mongoose");
// const schema = mongoose.Schema
const {Schema} = mongoose

var tableStructure = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    id:{
        type: Number,
        required: true,
        unique: true, 
    }
  })

var candidate = mongoose.model("Candidate",tableStructure)

module.exports = candidate;


