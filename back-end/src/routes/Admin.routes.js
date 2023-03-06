const { Router } = require('express');
const { adminController } = require('../controllers');
const { verifyToken } = require('../auth/jwtFunctions');
const validateAdminRegister = require('../middlewares/validateAdminRegister');
const validateAdmin = require('../middlewares/validateAdmin');

const router = Router();

router.post(
  '/',
  verifyToken,
  validateAdmin,
  validateAdminRegister,
  adminController.registerUser,
);

router.get(
  '/',
  verifyToken,
  validateAdmin,
  adminController.getAllUsers,
);

router.delete(
  '/:id',
  verifyToken,
  validateAdmin,
  adminController.deleteUserById,
);

module.exports = router;