// const Sequelize = require("sequelize");

// const db = new Sequelize("ecommercedb", null, null, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

// module.exports = db;

const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.POSTGRES_URL);

module.exports = db;
