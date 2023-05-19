const Sequelize = require("sequelize");
const db = require("../db");

class Orders extends Sequelize.Model {}

Orders.init(
  {
    total_value: {
      type: Sequelize.FLOAT,
    },
    status: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "orders" }
);

module.exports = Orders;
