const express = require("express");
const router = express.Router();
const { productsController } = require("../controller");

router.post("/products/", productsController.addProduct);
router.put("/products/:id", productsController.editProduct);
router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;
