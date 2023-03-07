const { Router } = require('express');
const { checkOutController } = require('../controllers');
const { verifyToken } = require('../auth/jwtFunctions');
const validateCheckOut = require('../middlewares/validateCheckOut');

const router = Router();

router.post(
  '/',
  verifyToken,
  // validateCheckOut,
  checkOutController,
);

module.exports = router;