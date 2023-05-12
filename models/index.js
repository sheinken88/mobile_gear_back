const Users = require("./Users");
const Products = require("./Products");
const Brands = require("./Brands");
const Categories = require("./Categories");

Products.belongsTo(Brands);
Products.belongsTo(Categories);

module.exports = { Users, Products, Brands, Categories };
