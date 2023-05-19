const Users = require("./Users");
const Products = require("./Products");
const Brands = require("./Brands");
const Categories = require("./Categories");
const Orders = require("./Orders");
const Payments = require("./Payments");
const Deliveries = require("./Deliveries");
const Checkouts = require("./Checkouts");
const PaymentInfo = require("./Checkouts");

Products.belongsTo(Brands);
Products.belongsTo(Categories);

Users.belongsTo(PaymentInfo);
Users.belongsTo(Checkouts);

Orders.belongsTo(Products);
Orders.belongsTo(Checkouts);

Checkouts.belongsTo(Payments);
Checkouts.belongsTo(Deliveries);

/*
Orders.belongsToMany(Products, {
  through: "ordersproducts",
});
Products.belongsToMany(Orders, {
  through: "ordersproducts",
});
*/

module.exports = {
  Users,
  Products,
  Brands,
  Categories,
  Orders,
  Deliveries,
  Payments,
  Checkouts,
  PaymentInfo,
};
