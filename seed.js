const db = require("./db");
const { Users, Products, Categories, Brands, Orders } = require("./models");
const { faker } = require("@faker-js/faker");

const seeder = async () => {
  let brands = [];
  let categories = [];

  for (let i = 0; i < 10; i++) {
    const brand = await Brands.create({
      name: faker.company.name(),
    });
    const category = await Categories.create({
      name: faker.commerce.product(),
    });
    categories.push(category);
    brands.push(brand);
  }

  let users = [];
  let products = [];

  for (let i = 0; i < 50; i++) {
    const user = await Users.create({
      is_admin: false,
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ min: 8, max: 24 }),
    });

    const product = await Products.create({
      name: faker.commerce.productName(),
      product_img: faker.image.url(),
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
    is_admin: true,
    username: "admin",
    email: "admin@mail.com",
    password: "1234",
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
};

module.exports = seeder;
