const Users = require("./Users");
const Products = require("./Products");
const Brands = require("./Brands");
const Categories = require("./Categories");
const ProductOrders = require("./ProductOrders");
const Payments = require("./Payments");
const Deliverys = require("./Deliverys");
const Orders = require("./Orders");
const PaymentInfo = require("./PaymentInfo");

Products.belongsTo(Brands);
Products.belongsTo(Categories);

Users.belongsTo(PaymentInfo);

ProductOrders.belongsTo(Products);
ProductOrders.belongsTo(Users);
ProductOrders.belongsTo(Orders);

Orders.belongsTo(Payments);
Orders.belongsTo(Deliverys);

Users.belongsToMany(Orders, { through: "OrderHistory" });
Orders.belongsToMany(Users, { through: "OrderHistory" });

module.exports = {
  Users,
  Products,
  Brands,
  Categories,
  ProductOrders,
  Deliverys,
  Payments,
  Orders,
  PaymentInfo,
};
