const express = require("express");
const router = express.Router();
const { checkoutController } = require("../controller");
const validateUser = require("../middleware/auth");

router.post("/", validateUser, checkoutController.addToCheckout);
router.get("/", validateUser, checkoutController.listCheckout);

module.exports = router;
