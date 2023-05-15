const Sequelize = require("sequelize");
const db = require("../db");

class Payments extends Sequelize.Model {}

Payments.init(
  {
    type: { type: Sequelize.STRING },
  },
  { sequelize: db, modelName: "payments" }
);

module.exports = Payments;
