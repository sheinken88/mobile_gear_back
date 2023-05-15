const Sequelize = require("sequelize");
const db = require("../db");

class Deliveries extends Sequelize.Model {}

Deliveries.init(
  {
    type: { type: Sequelize.STRING },
    value: { type: Sequelize.FLOAT },
    eta: { type: Sequelize.DATE },
  },
  { sequelize: db, modelName: "deliveries" }
);

module.exports = Deliveries;
