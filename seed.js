const db = require("./db");
const { Users, Products, Categories, Brands } = require("./models");
const { faker } = require("@faker-js/faker");

// npm i @faker-js/faker

const seeder = () => {
  let brands = [];
  let categories = [];

  for (let i = 0; i < 10; i++) {
    brands.push({
      brandName: faker.company.name(),
    });
    categories.push({
      categoryName: faker.commerce.product(),
    });
  }

  categories.forEach((category) => {
    Categories.create(category);
  });

  brands.forEach((brand) => {
    Brands.create(brand);
  });

  let users = [];
  let products = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      isAdmin: false,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthDate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      email: faker.internet.email(),
      dni: faker.number.int({ min: 4000000, max: 50000000 }),
      password: faker.internet.password({ min: 8, max: 24 }),
    });

    products.push({
      modelName: faker.commerce.productName(),
      productImage: faker.image.url(),
      description: faker.commerce.productDescription(),
      features: faker.commerce.productAdjective(),
      price: faker.commerce.price(),
      discount: faker.number.int(100),
      stock: faker.number.int(30),
      brandId: faker.number.int({ min: 1, max: 5 }),
      categoryId: faker.number.int({ min: 1, max: 10 }),
    });
  }

  users.forEach((user) => {
    Users.create(user);
  });

  products.forEach((product) => {
    Products.create(product);
  });
};

module.exports = seeder;
