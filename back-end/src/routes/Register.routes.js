const { Router } = require('express');
const { registerController } = require('../controllers');
const validateRegister = require('../middlewares/validateRegister');

const router = Router();

router.post(
  '/',
  validateRegister,
  registerController,
);

module.exports = router;