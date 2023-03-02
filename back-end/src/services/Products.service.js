const { Product } = require('../database/models');
// const { createToken } = require('../auth/jwtFunctions');
// const decodePassword = require('../validations/validatePassword');
// const ErrorClass = require('../utils/ErrorClass');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const getProductById = async (id) => {
 const product = await Product.findByPk(id);
 return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
