const Sequelize = require("sequelize");
const db = require("../db");

class Products extends Sequelize.Model {}
Products.init(
  {
    modelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    productImage: {
      type: Sequelize.STRING,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    features: {
      type: Sequelize.TEXT,
    },

    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },

    discount: {
      type: Sequelize.INTEGER,
    },

    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    qty: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

module.exports = Products;
