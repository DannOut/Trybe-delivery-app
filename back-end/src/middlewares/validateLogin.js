const ErrorClass = require('../utils/ErrorClass');

const validateLogin = (req, _res, next) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ErrorClass(404, 'email or password required');
  next();
};

module.exports = validateLogin;
