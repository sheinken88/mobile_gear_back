const Sequelize = require("sequelize");
const db = require("../db");

class Brands extends Sequelize.Model {}
Brands.init(
  {
    brandName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "brands",
  }
);

module.exports = Brands;
