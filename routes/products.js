const express = require("express");
const router = express.Router();
const { productsController } = require("../controller");

router.get("/", productsController.listProducts);
router.get("/:id", productsController.getProduct);
router.put("/admin/:id", productsController.editProduct);
router.post("/admin/add", productsController.addProduct);
router.delete("/admin/:id", productsController.deleteProduct);
module.exports = router;
