const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");


// API Routes
router.use("/api", apiRoutes);
// Auth Routes
router.use("/auth", authRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "/../client/dist/build/index.html"));
});
module.exports = router;