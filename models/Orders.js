const Sequelize = require("sequelize");
const db = require("../db");

class Orders extends Sequelize.Model {}

Orders.init(
  {
    status: {
      type: Sequelize.STRING,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "orders" }
);

module.exports = Orders;
