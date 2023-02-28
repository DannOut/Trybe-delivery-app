const ErrorClass = require('../utils/ErrorClass');

const validateLogin = (req, _res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new ErrorClass(404, '');
  } catch (e) {
  next(e);
  }
};

module.exports = validateLogin;
