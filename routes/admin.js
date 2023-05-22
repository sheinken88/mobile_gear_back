const express = require("express");
const router = express.Router();
const { productsController, usersController } = require("../controller");
const validateUser = require("../middleware/auth");

router.post("/products/", validateUser, productsController.addProduct);
router.put("/products/:id", validateUser, productsController.editProduct);
router.delete("/products/:id", validateUser, productsController.deleteProduct);

router.get("/users", validateUser, usersController.listUsers);
router.put("/users/:id", validateUser, usersController.switchPrivileges);
router.delete("/users/:id", validateUser, usersController.removeUser);

module.exports = router;
