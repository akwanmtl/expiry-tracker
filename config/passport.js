const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models');

passport.use(new LocalStrategy(
  (username,password, done) => {
    db.User.findOne({username: username}, (err, user) => {
      if(err) throw err;
      if(!user) return done(null,false, {message: 'Incorrect user'})
      bcrypt.compare(password, user.password, (err,result) => {
        if(err) throw err;
        if(result === true) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Incorrect password'})
        }
      })
    })
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;