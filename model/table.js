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
    test_scores: [
      {
        test_name: {
          type: String,
          enum: ['first_round', 'second_round', 'third_round'],
        },
        score: {
          type: Number,
          min: 0,
          max: 10,
        },
      },
    ],
  })

var candidate = mongoose.model("Candidate",tableStructure)

module.exports = candidate;


