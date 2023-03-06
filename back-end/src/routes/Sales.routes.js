const { Router } = require('express');
const { salesController } = require('../controllers');
const { verifyToken } = require('../auth/jwtFunctions');
const validateStatus = require('../middlewares/validateStatus');

const router = Router();

router.get(
  '/',
  verifyToken,
  salesController.getAllSales,
);

router.get(
  '/sellers',
  verifyToken,
  salesController.getAllSellers,
);

router.get(
  '/:id',
  verifyToken,
  salesController.getSaleById,
);

router.patch(
  '/:id',
  verifyToken,
  validateStatus,
  salesController.changeStatus,
);

module.exports = router;