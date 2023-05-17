const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/auth");
const { usersController } = require("../controller");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.get("/secret", usersController.secret);
router.get("/me", validateUser, usersController.me);
router.post("/logout", usersController.logout);

module.exports = router;
