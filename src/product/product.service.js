// service layer berfungsi untuk handle business logic
// kenapa dipisah? supaya tanggung jawabnya ter-isolate dan functionnya reusable

const {
  findProduct,
  findProductById,
  insertProduct,
  deleteProduct,
} = require("./product.repository");

const getAllProduct = async () => {
  const product = await findProduct();

  return product;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProduct) => {
  const product = await insertProduct();

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProductById,
};
