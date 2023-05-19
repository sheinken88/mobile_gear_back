const express = require("express");
const router = express.Router();
const { productsController } = require("../controller");

router.get("/", productsController.listProducts);
router.get("/:id", productsController.getProduct);
module.exports = router;
