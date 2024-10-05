const express = require("express");
const app = express();
const dotenv = require("dotenv");

const productController = require("./product/products.controller");

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/api/", (req, res) => {
  res.send("hello world");
});

app.use("/product", productController);

app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});
