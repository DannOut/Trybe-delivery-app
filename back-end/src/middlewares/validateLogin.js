const ErrorClass = require('../utils/ErrorClass');

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const validateEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
  if (!email || !password) throw new ErrorClass(404, 'email or password required');
  if (password.length < 6) throw new ErrorClass(404, 'invalid password');
  if (!validateEmail.test(email)) throw new ErrorClass(404, 'email invalid');
  next();
};

module.exports = validateLogin;
