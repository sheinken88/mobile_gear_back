const express = require("express");
const router = express.Router();
const { productsController } = require("../controller");

router.get("/", productsController.listProducts);
router.get("/:id", productsController.getProduct);
router.put("/:id", productsController.editProduct);
router.post("/add", productsController.addProduct);

module.exports = router;
