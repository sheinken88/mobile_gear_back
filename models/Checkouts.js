const Sequelize = require("sequelize");
const db = require("../db");

class Checkouts extends Sequelize.Model {}

Checkouts.init(
  {
    total_value: {
      type: Sequelize.FLOAT,
    },
  },
  { sequelize: db, modelName: "checkouts" }
);

module.exports = Checkouts;
