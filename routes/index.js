const express = require("express");
const router = express.Router();
const users = require("./users");
const products = require("./products");
const admin = require("./admin");
const cart = require("./cart");
const orders = require("./orders");

router.use("/users", users);
router.use("/products", products);
router.use("/cart", cart);
router.use("/admin", admin);
router.use("/orders", orders);

module.exports = router;
