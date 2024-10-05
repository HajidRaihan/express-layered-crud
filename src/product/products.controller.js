const express = require("express");
const router = express.Router();
const prisma = require("../db");
const {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
  const products = getAllProduct();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;

  const product = await createProduct(newProduct);

  return res.status(201).json({
    message: "create product success",
    data: product,
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price } = req.body;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      image,
      price,
    },
  });

  return res.status(200).json({
    message: "update product success",
    data: product,
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await deleteProductById(id);

    return res.send("product deleted");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
