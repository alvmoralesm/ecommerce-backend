const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");

router.get("/products", async (req, res) => {
  const products = await Product.find();

  if (!products) res.status(500).send({ success: false });

  res.send(products);
});

router.post("/products", (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
