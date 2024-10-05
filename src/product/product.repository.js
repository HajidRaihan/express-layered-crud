// layer repository untuk berkomunikasi dengan database
// agar kalau ingin ganti ganti ORM hanya diganti di layer ini saja

const prisma = require("../db");

const findProduct = async () => {
  const product = await prisma.product.findMany();

  return product;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findProduct,
  findProductById,
  insertProduct,
  deleteProduct,
};
