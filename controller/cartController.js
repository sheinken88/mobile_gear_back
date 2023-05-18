const { Products, Orders, Ordersproducts } = require("../models");

const addToCart = async (req, res) => {
  const { id, qty } = req.body;

  try {
    if (req.user) {
    }
    const order = await Orders.create({
      status: "cart",
      userId: req.user.id,
      qty,
    });
    const product = await Products.findByPk(id);
    order.setProducts(product);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
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
        products[product.name].qty++;
      } else {
        products[product.name] = { qty: 1, data: product };
      }
    }
    res.send(products);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const product = await Products.findByPk(req.body.id, { include: Orders });
    product.removeOrder(product.orders[0]);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = { deleteFromCart, addToCart, listCart };
