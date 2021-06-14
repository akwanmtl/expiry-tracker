const express = require("express");
const cors = require('cors');
const session = require('express-session');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const { User } = require('./models');
const jwt = require("jsonwebtoken");

// Passport
const passport = require('./config/passport');
app.use(session({ secret: 'kirby ate everything', resave: true, saveUninitialized: true }));

app.use(cors({
  origin: 'http://food-lifesaver.herokuapp.com/',
  credentials: true
}));

app.use(cookieParser('kirby ate everything'))
app.use(passport.initialize())
app.use(passport.session());

require('dotenv').config();

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', 'http://food-lifesaver.herokuapp.com/');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header( 'Access-Control-Allow-Credentials',true);
  next();
});  

app.use(function (req, res, next) {
  const token = req.cookies.token || '';

  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      User.findById(decoded.id)
      .then((user) => {
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/expiryTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;