const { generateToken, validateToken } = require("../config/tokens");
const { Users } = require("../models");

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.sendStatus(401);
    const { id, email, is_admin, username } = user;
    user.validatePassword(req.body.password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        const token = generateToken({ id, username, is_admin, email });
        res.cookie("token", token);
        res.sendStatus(200);
      }
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

const signup = async (req, res) => {
  try {
    await Users.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
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
