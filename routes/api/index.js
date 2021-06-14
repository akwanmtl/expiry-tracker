const path = require("path");
const router = require("express").Router();
const controller = require("../../controllers/controller")

router
  .route("/food")
  .get(controller.getAllFood)
  .post(controller.addFood)

router
  .route("/food/:id")
  .put(controller.updateFood)
  .delete(controller.removeFood)

module.exports = router;