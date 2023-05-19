const { Users, Products, Categories, Brands } = require("./models");

const seeder = async () => {
  const products = require("./products.json");

  for (let i = 0; i < products.length; i++) {
    let { name, price, type, brand, product_img, stock } = products[i];
    //console.log(1, products[i]);
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
    email: "user@mail.com",
    password: "1234",
  });
};

module.exports = seeder;
