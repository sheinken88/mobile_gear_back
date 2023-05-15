const Users = require("./Users");
const Products = require("./Products");
const Brands = require("./Brands");
const Categories = require("./Categories");
const Orders = require("./Orders");
const Payments = require("./Payments");
const Deliveries = require("./Deliveries");
const Ordersproducts = require("./Ordersproducts");

Products.belongsTo(Brands);
Products.belongsTo(Categories);

Orders.belongsTo(Users);
Orders.belongsTo(Payments);
Orders.belongsTo(Deliveries);

Orders.belongsToMany(Products, {
  through: "ordersproducts",
});
Products.belongsToMany(Orders, {
  through: "ordersproducts",
});

module.exports = {
  Users,
  Products,
  Brands,
  Categories,
  Orders,
  Deliveries,
  Payments,
  Ordersproducts,
};
