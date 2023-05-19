const db = require("./db");
const {
  Users,
  Products,
  Categories,
  Brands,
  Orders,
  Payments,
  Deliveries,
} = require("./models");
const { faker } = require("@faker-js/faker");

const seeder = async () => {
  let brands = [];
  let categories = [];
  let payments = [];
  let deliveries = [];

  for (let i = 0; i < 10; i++) {
    const brand = await Brands.create({
      name: faker.company.name(),
    });
    const category = await Categories.create({
      name: faker.commerce.product(),
    });
    const delivery = await Deliveries.create({
      type: faker.commerce.product(),
      value: faker.commerce.price(),
      eta: faker.date.anytime(),
    });
    const payment = await Payments.create({
      type: faker.commerce.product(),
    });
    categories.push(category);
    brands.push(brand);
    payments.push(payment);
    deliveries.push(delivery);
  }

  let products = [];

  for (let i = 0; i < 50; i++) {
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

    products.push(product);
  }

  await Users.create({
    is_admin: true,
    username: "admin",
    email: "admin@mail.com",
    password: "1234",
  });

  await Users.create({
    is_admin: false,
    username: "user",
    email: "user@mail.com",
    password: "1234",
  });

  console.log("Fake data loaded");

  /*
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
  */
};

module.exports = seeder;
