const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { 
    type: String,
    required: true
  },
  location: { 
    type: String,
    enum: [
      'Pantry',
      'Fridge',
      'Freezer',
      'Shopping',
      'Counter'
    ],
    required: true
  },
  expiryDate:{
    type: Date
  }
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;