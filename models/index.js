const Users = require("./Users");
const Products = require("./Products");
const Brands = require("./Brands");
const Categories = require("./Categories");
const ProductOrders = require("./ProductOrders");
const Payments = require("./Payments");
const Deliveries = require("./Deliveries");
const Orders = require("./Orders");
const PaymentInfo = require("./PaymentInfo");

Products.belongsTo(Brands);
Products.belongsTo(Categories);

Users.belongsTo(PaymentInfo);
Users.belongsTo(Orders);

ProductOrders.belongsTo(Products);
ProductOrders.belongsTo(Users);
ProductOrders.belongsTo(Orders);

Orders.belongsTo(Payments);
Orders.belongsTo(Deliveries);

module.exports = {
  Users,
  Products,
  Brands,
  Categories,
  ProductOrders,
  Deliveries,
  Payments,
  Orders,
  PaymentInfo,
};
