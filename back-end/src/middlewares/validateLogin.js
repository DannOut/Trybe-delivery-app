const ErrorClass = require('../utils/ErrorClass');

const validateLogin = (req, _res, next) => {
const { email, password } = req.body;
if (!email || !password) throw new ErrorClass(404, '');
next();
};

module.exports = validateLogin;
