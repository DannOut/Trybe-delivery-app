const { Router } = require('express');
const { productsController } = require('../controllers');
const { verifyToken } = require('../auth/jwtFunctions');

const router = Router();

router.get(
  '/',
  verifyToken,
  productsController.getAllProducts,
);

router.get(
  '/:id',
  verifyToken,
  productsController.getProductById,
);

module.exports = router;