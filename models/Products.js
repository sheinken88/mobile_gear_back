const Sequelize = require("sequelize");
const db = require("../db");

class Products extends Sequelize.Model {}
Products.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    product_img: {
      type: Sequelize.STRING,
    },

    description: {
      type: Sequelize.TEXT,
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
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

module.exports = Products;
