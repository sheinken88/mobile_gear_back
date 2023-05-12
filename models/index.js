const Users = require("./Users");
const Products = require("./Products");
const Brands = require("./Brands");
const Categories = require("./Categories");
const Order = require("./Order");

Products.belongsTo(Brands);
Products.belongsTo(Categories);
Order.belongsTo(Users);
Users.hasMany(Order);
Order.belongsToMany(Products, { through: "orderproducts" });
Products.belongsToMany(Order, { through: "orderproducts" });
module.exports = { Users, Products, Brands, Categories, Order };
