const { productsService } = require('../services');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await productsService.getAllProducts();
    res.status(200).json(allProducts);
  } catch (e) {
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await productsService.getProductById(id);
    res.status(200).json(productById);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};