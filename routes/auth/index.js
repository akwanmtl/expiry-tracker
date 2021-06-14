const path = require("path");
const router = require("express").Router();
const controller = require("../../controllers/controller")
const passport = require("../../config/passport");
const jwt = require("jsonwebtoken");
const expiration = 24*60*60*1000; 

router
  .route("/login")
  .post(passport.authenticate("local"), (req, res)=>{
    controller.findUser(req, res);
  })
  
router.route("/signup")
  .post(controller.addUser)

  
router.route("/logout")
  .get((req,res)=>{
    req.logout();
    res.clearCookie("token").send();
  })

router.route("/user")
  .get((req,res)=>{
    res.json(req.user)
  })

module.exports = router;