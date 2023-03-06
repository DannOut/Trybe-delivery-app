const ErrorClass = require('../utils/ErrorClass');

const validateFields = ({ email, password, name }) => {
  if (!email || !password || !name) return false;
  return true;
};

const validateAdminRegister = (req, _res, next) => {
  const fieldsExists = validateFields(req.body);
  const { email, password, name } = req.body;
  if (!fieldsExists) throw new ErrorClass(404, 'missing some required fields');
  const validateEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
  if (password.length < 6) throw new ErrorClass(404, 'invalid password');
  if (name.length < 12) throw new ErrorClass(404, 'invalid name field');
  if (!validateEmail.test(email)) throw new ErrorClass(404, 'email invalid');
  next();
};

module.exports = validateAdminRegister;