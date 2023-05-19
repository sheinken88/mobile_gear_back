const Sequelize = require("sequelize");
const db = require("../db");

class ProductOrders extends Sequelize.Model {}

ProductOrders.init(
  {
    qty: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "productorders" }
);

module.exports = ProductOrders;
