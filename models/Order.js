const Sequelize = requie("sequelize");
const db = require("../db");

class Order extends Sequelize.model {}

Order.init(
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    product_id: { type: Sequelize.INTEGER, allowNull: false },
    product_qty: { type: Sequelize.INTEGER, allowNull: false },
    totalValue: { type: Sequelize.INTEGER, allowNull: false },
    payment_id: { type: Sequelize.INTEGER, allowNull: false },
    delivery_id: { type: Sequelize.INTEGER, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "Order" }
);

module.exports = Order;
