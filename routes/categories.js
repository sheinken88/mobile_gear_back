const express = require("express");
const router = express.Router();
const { categoriesController } = require("../controller");
const validateUser = require("../middleware/auth");

router.get("/", categoriesController.listCategories);
router.post("/", validateUser, categoriesController.addCategory);
router.put("/:id", validateUser, categoriesController.editCategory);
router.delete("/:id", validateUser, categoriesController.deleteCategory);

module.exports = router;
