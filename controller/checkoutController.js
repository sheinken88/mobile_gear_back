const { Orders, Products, ProductOrders, Users } = require("../models");

const addToCheckout = async (req, res) => {
  try {
    if (!req.user.orderId) {
      const order = await Orders.create({
        paymentId: 2,
        deliveryId: 3,
      });

      const { data } = req.body;

      for (let i = 0; i < data.length; i++) {
        await ProductOrders.create({
          orderId: order.id,
          productId: data[i].id,
          qty: data[i].qty,
        });
      }

      await Users.update({ orderId: order.id }, { where: { id: req.user.id } });
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

const listCheckout = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    console.log("user:", user);
    if (user && user.orderId) {
      const productorders = await ProductOrders.findAll({
        where: { orderId: user.orderId },
        include: [Products],
      });
      const total = productorders.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0
      );
      res.send({ data: productorders, total });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = { addToCheckout, listCheckout };
