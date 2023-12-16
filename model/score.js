const mongoose = require("mongoose");
// const schema = mongoose.Schema
const {Schema} = mongoose

var tableStructure = new Schema({
    id: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true
    },
    round:{
        type: Number,
        required: true
    }
  })

var score = mongoose.model("score",tableStructure)

module.exports = score;


