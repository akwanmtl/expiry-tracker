const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/expiryTracker");

const foodSeed =
  {
    name: 'bread',
    location: 'Pantry',
    expiryDate: new Date(),
  }
db.Food.remove({})
  .then(() => db.Food.create(foodSeed))
  .then(({_id}) => {
    db.User.findOneAndUpdate({username: 'test1'}, { $push: {foods: _id}}, {new: true})
    .then(dbUser=>{
      console.log(dbUser)
      process.exit(0);
    })
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });