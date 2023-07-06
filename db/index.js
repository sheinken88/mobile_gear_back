require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
  "ecommercedb",
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = db;
