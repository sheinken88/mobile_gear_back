const { getConditions } = require("./utils");
const { Products, Brands, Categories } = require("../models");
const { Op } = require("sequelize");

const listProducts = async (req, res) => {
  try {
    if (req.query.modelName == "") {
      data = await Products.findAll();
    } else {
      const conditions = getConditions(req.query);
      data = await Products.findAll(conditions);
    }
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
      const data = await Products.update(req.body, {
        where: { id: Number(req.params.id) },
      });
      res.sendStatus(200);
    } else {
      res.status(403).send({ message: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.is_admin) {
      const data = await Products.create(req.body);
      res.send(data);
    } else {
      res.status(403).send({ message: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (req.user.is_admin) {
      await Products.destroy({
        where: { id: Number(req.params.id) },
      });
      res.sendStatus(200);
    } else {
      res.status(403).send({ message: "Acceso denegado" });
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
