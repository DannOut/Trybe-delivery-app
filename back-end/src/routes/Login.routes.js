const { Router } = require('express');
const { loginController } = require('../controllers');
// const validateLogin = require('../middlewares/validateLogin');

const router = Router();

router.post(
  '/',
  // validateLogin,
  loginController, 
);

module.exports = router;
