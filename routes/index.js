const express = require("express");
const router = express.Router();
const { getConditions } = require("./utils");

const {
  Users,
  Products,
  Brands,
  Categories,
  Orders,
  Ordersproducts,
} = require("../models");

const validateUser = require("../middleware/auth");
const { generateToken, validateToken } = require("../config/tokens");

router.post("/users/signup", (req, res) => {
  Users.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.post("/users/login", (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      console.log(user);
      if (!user) return res.sendStatus(401);
      const { id, email } = user;
      user.validatePassword(req.body.password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        else {
          const token = generateToken({ id, userName, isAdmin, email });
          res.cookie("token", token);
          res.sendStatus(200);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
});

router.get("/secret", (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
});

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/products", async (req, res) => {
  try {
    const conditions = getConditions(req.query);
    const data = await Products.findAll(conditions);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const data = await Products.findByPk(Number(req.params.id), {
      include: [Brands, Categories],
    });
    res.send(data);
  } catch {
    res.sendStatus(404);
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const data = await Products.update({
        where: { id: Number(req.params.id) },
      });
      res.send(data);
    }
    res.sendStatus(200);
  } catch {
    res.sendStatus(404);
  }
});

router.post("/products/add", async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const data = await Products.findOrCreate(req.body);
      if (data[1]) {
        res.send(data[0]);
      }
    }
    res.sendStatus(200);
  } catch {
    res.sendStatus(404);
  }
});

//orden agregar al carrito

router.post("/cart/add", async (req, res) => {
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
});

//orden eliminar del carrito

router.post("/cart/delete", async (req, res) => {
  try {
    const product = await Products.findByPk(req.body.id, { include: Orders });
    product.removeOrder(product.orders[0]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.get("/cart/count", async (req, res) => {
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
});

// export
module.exports = router;
