const express = require("express");
const router = express.Router();
const { cartController } = require("../controller");

router.post("/add", cartController.addToCart);
router.post("/delete", cartController.deleteFromCart);
router.get("/count", cartController.listCart);

module.exports = router;
