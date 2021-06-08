const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");


// API Routes
router.use("/api", apiRoutes);
// Auth Routes
router.use("/auth", authRoutes);

router.use((req,res)=>{
  console.log("error 404");
  res.redirect("/")
})

module.exports = router;