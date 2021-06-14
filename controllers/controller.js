const db = require("../models");
const jwt = require("jsonwebtoken");
const expiration = 24*60*60*1000; 

module.exports = {
  getAllFood: function(req,res){
    if(req.user){
    db.User.find({username: req.user.username})
      .populate("foods")
      .then(dbUser =>{
        console.log(dbUser[0].foods)
        res.json(dbUser[0].foods)
      })
    }
    else{
      res.json()
    }
  },

  addFood: function(req,res){
    console.log(req.body.item)
    db.Food
      .create(req.body.item)
      .then((dbFood) => {
        console.log('added', dbFood)
        console.log(req.user.username)
        db.User
          .findOneAndUpdate({username: req.user.username}, {$push: { foods: dbFood._id} }, {new: true})
          .then(dbUser =>{
            console.log('added', dbUser)
            res.json(dbFood);
          })
      })
      .catch(err => {
        res.json(err)
      })
  },

  updateFood: function(req, res){
    console.log(req.body)
    db.Food
      .updateOne({_id: req.params.id}, {location: req.body.location, expiryDate: req.body.expiryDate})
      .then(() =>{
        let option = {}
        if(req.body.location === "Shopping"){
          if(!req.body.expired){
            option.$inc = { "finished": 1}
          }
          else{
            option.$inc = { "expired": 1}
          }
        }
        db.User
        .findOneAndUpdate({username: req.user.username}, option, {new: true})
        .then(dbUser =>{
          console.log('modified', dbUser)
          res.json(dbUser);
        })
      })
      .catch(err => req.status(422).json(err))
  },

  removeFood: function(req, res){
    console.log('deleting', req.params.id)
    db.Food
    .findOneAndDelete({_id: req.params.id})
    .then(dbModel =>{

      let option = {
        $pull: { foods: req.params.id}
      }
      if(dbModel.location !== "Shopping"){
        const foodExpiry = new Date(dbModel.expiryDate);
        if(foodExpiry >= new Date()){
          option.$inc = { "finished": 1}
        }
        else{
          option.$inc = { "expired": 1}
        }
      }
      db.User
        .findOneAndUpdate({username: req.user.username}, option, {new: true})
        .then(dbUser =>{
          console.log('modified', dbUser)
          res.json(dbUser);
        })
    })
    .catch(err => req.status(422).json(err))
  },

  addUser: function(req,res){
    db.User.findOne({username: req.body.username}, async (err, user) => {
      if(err) throw err;
      if(user) res.send('User already exists');
      if(!user) {
        try{
          const userData = await db.User.create(req.body);
          const token = jwt.sign(
            { id: userData._id },
            process.env.SESSION_SECRET
          );
          res.cookie('token', token, {
            maxAge: expiration, 
            httpOnly : true
          })
          // user['token'] = token;
          res.json(userData);
        }
        catch(err){
          console.log(err)
          res.status(401).send('Error occurred')
        }
      }
    })
  },

  findUser: function(req,res){
    db.User.findOne({username: req.body.username}, async (err, user) => {
      if(err) throw err;
      try{
        const token = jwt.sign(
          { id: user._id },
          process.env.SESSION_SECRET
        );
        res.cookie('token', token, {
          maxAge: expiration, 
          httpOnly : true
        })
        user['token'] = token;
        res.json(user);
      }
      catch(err){
        res.status(401).send('Error occurred')
      }
      // db.User.create(req.body)
      // .then(data => res.json(data));
      
    })
  }
}