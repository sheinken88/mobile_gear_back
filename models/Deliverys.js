const Sequelize = require("sequelize");
const db = require("../db");

class Deliverys extends Sequelize.Model {}

Deliverys.init(
  {
    type: { type: Sequelize.STRING },
    value: { type: Sequelize.FLOAT },
    eta: { type: Sequelize.DATE, defaultValue: new Date() },
  },
  { sequelize: db, modelName: "deliverys" }
);

module.exports = Deliverys;
