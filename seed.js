const db = require("./db");
const { Users, Products, Categories, Brands, Orders } = require("./models");
const { faker } = require("@faker-js/faker");

// npm i @faker-js/faker

const seeder = async () => {
  let brands = [];
  let categories = [];

  for (let i = 0; i < 10; i++) {
    const brand = await Brands.create({
      brandName: faker.company.name(),
    });
    const category = await Categories.create({
      categoryName: faker.commerce.product(),
    });
    categories.push(category);
    brands.push(brand);
  }

  let users = [];
  let products = [];

  for (let i = 0; i < 50; i++) {
    const user = await Users.create({
      isAdmin: false,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthDate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      email: faker.internet.email(),
      dni: faker.number.int({ min: 4000000, max: 50000000 }),
      password: faker.internet.password({ min: 8, max: 24 }),
    });

    const product = await Products.create({
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

    users.push(user);

    products.push(product);
  }

  let admin = await Users.create({
    isAdmin: false,
    firstName: "Admin",
    lastName: "Test",
    birthDate: new Date(),
    email: "admin@email.com",
    dni: 1000000,
    password: "12345678",
  });

  users.push(admin);

  let orders = [];

  for (let i = 0; i < 25; i++) {
    const order = await Orders.create({
      status: "cart",
      userId: faker.number.int({ min: 1, max: 50 }),
    });
    orders.push(order);
  }
  for (let i = 0; i < 3; i++) {
    const order = await Orders.create({
      status: "cart",
      userId: 3,
    });
    orders.push(order);
  }
  /*
  let idxProducts = [5, 21, 13, 22, 22, 22, 44];

  orders[25].setProducts(
    products.filter((_, i) => {
      return idxProducts.includes(i);
    })
  );
  orders[26].setProducts(
    products.filter((_, i) => {
      return idxProducts.includes(i);
    })
  );
  orders[27].setProducts(
    products.filter((_, i) => {
      return idxProducts.includes(i);
    })
  );*/
};

module.exports = seeder;
