const express = require("express");
const router = express.Router();

const { Users, Products } = require("../models");
const validateUser = require("../middleware/auth");
const { generateToken, validateToken } = require("../config/tokens");

router.post("/signup", (req, res) => {
  Users.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    const { id, username, email } = user;
    user.validatePassword(req.body.password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        const token = generateToken({ id, username, email });
        res.cookie("token", token);
        res.sendStatus(200);
      }
    });
  });
});

router.get("/secret", (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
});

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/products", (req, res) => {
  Products.findAll()
    .then((data) => res.send(data))
    .catch(() => res.send(404));
});

router.get("/products/:id", (req, res) => {
  Products.findByPk(Number(req.params.id))
    .then((data) => res.send(data))
    .catch(() => res.send(404));
});

// export
module.exports = router;
