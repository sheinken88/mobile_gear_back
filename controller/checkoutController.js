const { Orders, Products, Checkouts, Users } = require("../models");

const addToCheckout = async (req, res) => {
  try {
    if (!req.user.checkoutId) {
      const checkout = await Checkouts.create({
        paymentId: 2,
        deliveryId: 3,
      });

      const { data } = req.body;

      for (let i = 0; i < data.length; i++) {
        await Orders.create({
          status: "checkout",
          checkoutId: checkout.id,
          productId: data[i].id,
          qty: data[i].qty,
        });
      }

      await Users.update(
        { checkoutId: checkout.id },
        { where: { id: req.user.id }, returning: true }
      );
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
    if (user && user.checkoutId) {
      const orders = await Orders.findAll({
        where: { checkoutId: user.checkoutId },
        include: [Products],
      });
      const total = orders.reduce(
        (acc, order) => acc + order.product.price * order.qty,
        0
      );
      res.send({ data: orders, total });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = { addToCheckout, listCheckout };
