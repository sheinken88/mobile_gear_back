const Sequelize = require("sequelize");
const db = require("../db");

class Categories extends Sequelize.Model {}
Categories.init(
  {
    categoryName: {
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
