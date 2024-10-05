const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/api/", (req, res) => {
  res.send("hello world");
});

app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      description: newProduct.description,
      image: newProduct.image,
      price: newProduct.price,
    },
  });

  return res.status(201).json({
    message: "create product success",
    data: product,
  });
});

app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});
