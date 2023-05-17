const express = require("express");
const router = express.Router();
const { getConditions } = require("./utils");
const { Products, Brands, Categories } = require("../models");

router.get("/", async (req, res) => {
  try {
    const conditions = getConditions(req.query);
    const data = await Products.findAll(conditions);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Products.findByPk(Number(req.params.id), {
      include: [Brands, Categories],
    });
    res.send(data);
  } catch {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res) => {
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

router.post("/add", async (req, res) => {
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

module.exports = router;
