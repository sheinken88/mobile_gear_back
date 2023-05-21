const express = require("express");
const router = express.Router();
const { ordersController } = require("../controller");
const validateUser = require("../middleware/auth");

router.post("/checkout", validateUser, ordersController.addToCheckout);
router.get("/checkout", validateUser, ordersController.listCheckout);
router.post("/confirm", validateUser, ordersController.confirmPurchase);
router.get("/history", validateUser, ordersController.purchaseHistory);

module.exports = router;
