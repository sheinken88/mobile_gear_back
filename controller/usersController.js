const { generateToken, validateToken } = require("../config/tokens");
const { Users } = require("../models");

const login = (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      const { id, email, isAdmin, userName } = user;
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
};

const signup = (req, res) => {
  Users.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

const secret = (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
};

const me = (req, res) => {
  res.send(req.user);
};

module.exports = { login, signup, logout, secret, me };
