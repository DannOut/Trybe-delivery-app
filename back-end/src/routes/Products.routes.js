const { Router } = require('express');
const { productsController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.get(
  '/',
  validateToken,
  productsController.getAllProducts,
);

router.get(
  '/:id',
  validateToken,
  productsController.getProductById,
);

module.exports = router;