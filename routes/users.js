const express = require("express");
const router = express.Router();
const validateUser = require("../middleware/auth");
const { generateToken, validateToken } = require("../config/tokens");
const { Users } = require("../models");

router.post("/signup", (req, res) => {
  Users.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      console.log(user);
      if (!user) return res.sendStatus(401);
      const { id, email } = user;
      user.validatePassword(req.body.password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        else {
          const token = generateToken({ id, userName, isAdmin, email });
          res.cookie("token", token);
          res.sendStatus(200);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
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

module.exports = router;
