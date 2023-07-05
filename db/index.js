// const Sequelize = require("sequelize");

// const db = new Sequelize("ecommercedb", null, null, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

// module.exports = db;

const Sequelize = require("sequelize");
require("dotenv").config({ path: ".env.development.local" });

const db = new Sequelize(process.env.POSTGRES_URL, {
  dialectModule: require("pg"),
  logging: false,
});

module.exports = db;
