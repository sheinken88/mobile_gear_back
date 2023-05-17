const { Products, Orders, Ordersproducts } = require("../models");

const addToCart = async (req, res) => {
  try {
    const order = await Orders.create({ status: "cart" });
    const product = await Products.findByPk(req.body.id);
    order.setProducts(product);
    console.log(order, product);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const listCart = async (req, res) => {
  try {
    let ordersproducts = await Ordersproducts.findAll();
    let products = {};

    for (let i = 0; i < ordersproducts.length; i++) {
      let orderproduct = ordersproducts[i];
      const product = await Products.findByPk(orderproduct.productId);

      if (products[product.modelName]) {
        products[product.modelName].qty++;
      } else {
        products[product.modelName] = { qty: 1, data: product };
      }
    }
    res.send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const product = await Products.findByPk(req.body.id, { include: Orders });
    product.removeOrder(product.orders[0]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

module.exports = { deleteFromCart, addToCart, listCart };
