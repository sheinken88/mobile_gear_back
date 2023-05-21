const { Users, Products, Categories, Brands } = require("./models");
const products = require("./products.json");

const seeder = async () => {
  for (let i = 0; i < products.length; i++) {
    let { name, price, type, brand, product_img, stock, discount } =
      products[i];
    let _brand = await Brands.findOrCreate({ where: { name: brand } });
    let category = await Categories.findOrCreate({
      where: { name: type },
    });

    const product = {
      name,
      price,
      categoryId: category[0].id,
      brandId: _brand[0].id,
      product_img,
      stock,
      discount,
    };
    await Products.create(product);
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
    email: "mobilegeartest@protonmail.com",
    password: "1234",
  });
};

module.exports = seeder;
