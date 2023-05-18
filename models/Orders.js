const Sequelize = require("sequelize");
const db = require("../db");

class Orders extends Sequelize.Model {}

Orders.init(
  {
    total_value: {
      type: Sequelize.FLOAT,
      // allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
  },
  { sequelize: db, modelName: "orders" }
);

module.exports = Orders;
