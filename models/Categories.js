const Sequelize = require("sequelize");
const db = require("../db");

class Categories extends Sequelize.Model {}
Categories.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "categories",
  }
);

module.exports = Categories;
