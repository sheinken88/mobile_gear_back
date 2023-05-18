const express = require("express");
const router = express.Router();
const { cartController } = require("../controller");

router.get("/", cartController.listCart);
router.post("/", cartController.addToCart);
router.delete("/", cartController.deleteFromCart);

module.exports = router;
