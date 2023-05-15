const Sequelize = require("sequelize");
const db = require("../db");

class Ordersproducts extends Sequelize.Model {}
Ordersproducts.init({}, { sequelize: db, modelName: "ordersproducts" });

module.exports = Ordersproducts;
