const { getConditions } = require("./utils");
const { Products, Brands, Categories } = require("../models");
const { Op } = require("sequelize");

const listProducts = async (req, res) => {
  try {
    const conditions = getConditions(req.query);
    const data = await Products.findAll(conditions);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

const discountedProducts = async (req, res) => {
  try {
    const data = await Products.findAll({
      where: {
        discount: { [Op.gt]: 15 },
      },
      include: [Categories, Brands],
    });
    res.send(data);
  } catch (err) {
    console.log(123, err);
    res.status(404).send(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const data = await Products.findByPk(Number(req.params.id), {
      include: [Brands, Categories],
    });
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

const editProduct = async (req, res) => {
  try {
    if (req.user.is_admin) {
      const data = await Products.update({
        where: { id: Number(req.params.id) },
      });
      res.send(data);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.is_admin) {
      const data = await Products.findOrCreate(req.body);
      if (data[1]) {
        res.send(data[0]);
      }
      res.sendStatus(200);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.user.is_admin) {
      const data = await Products.destroy({
        where: { id: Number(req.params.id) },
      });
      res.send(data).sendStatus(200);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  discountedProducts,
};
