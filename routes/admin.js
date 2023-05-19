const express = require("express");
const router = express.Router();
const { productsController } = require("../controller");
const validateUser = require("../middleware/auth");

router.post("/products/", validateUser, productsController.addProduct);
router.put("/products/:id", validateUser, productsController.editProduct);
router.delete("/products/:id", validateUser, productsController.deleteProduct);

module.exports = router;
