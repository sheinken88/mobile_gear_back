const {
  Orders,
  Users,
  Products,
  ProductOrders,
  Deliverys,
} = require("../models");

require("dotenv").config({ path: ".env.development.local" });

const transporter = require("../mailTransporter");

const confirmPurchase = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    const order = await Orders.findByPk(user.checkoutId, {
      include: Deliverys,
    });
    if (order.status == "checkout") {
      Orders.update({ status: "purchased" }, { where: { id: order.id } });
      user.setOrders(order);
      const productorders = await ProductOrders.findAll({
        where: { orderId: user.checkoutId },
        include: [Products],
      });
      const products = productorders
        .map((item) => item.product.name)
        .join(", ");
      let eta = order.delivery.eta;

      const days = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
      ];

      eta = `${days[eta.getDay()]} ${eta.getDate().toString()}`;

      const to = user.email;
      const subject = "¡Gracias por tu compra!";

      const text = `Compraste ${products}\n\nLlega el ${eta}`;

      // const mailOptions = {
      //   from: process.env.EMAIL_USER,
      //   to,
      //   subject,
      //   text,
      // };

      // await transporter.sendMail(mailOptions);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const addToCheckout = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);

    const delivery = await Deliverys.create();
    const order = await Orders.create({
      status: "checkout",
      deliveryId: delivery.id,
    });
    order.setUsers(user);

    const { data } = req.body;
    for (let i = 0; i < data.length; i++) {
      await ProductOrders.create({
        orderId: order.id,
        productId: data[i].id,
        userId: user.id,
        qty: data[i].quantity,
      });
    }

    await Users.update({ checkoutId: order.id }, { where: { id: user.id } });

    res.status(201).send({ message: "Orden agregada" });
  } catch (err) {
    res.status(404).send(err);
  }
};

const listCheckout = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    if (user && user.checkoutId) {
      const productorders = await ProductOrders.findAll({
        where: { orderId: user.checkoutId },
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

const purchaseHistory = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id, { include: Orders });
    if (user) {
      const orders = await ProductOrders.findAll({
        where: { userId: user.id },
        include: [Products, Orders],
      });
      res.send(orders);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const listAllOrders = async (req, res) => {
  if (req.user.is_admin) {
    const productOrders = await ProductOrders.findAll({
      include: [
        { model: Users, attributes: { exclude: ["password", "salt"] } },
        Products,
        Orders,
      ],
    });
    res.send(productOrders);
  } else {
    res.status(403).send({ message: "Acceso denegado" });
  }
};

module.exports = {
  addToCheckout,
  listCheckout,
  confirmPurchase,
  purchaseHistory,
  listAllOrders,
};
