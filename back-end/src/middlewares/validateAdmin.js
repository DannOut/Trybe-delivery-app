const { decodeToken } = require('../auth/jwtFunctions');
const ErrorClass = require('../utils/ErrorClass');

const validateAdmin = (req, _res, next) => {
  const { authorization } = req.headers;
  const { role } = decodeToken(authorization);
  if (role !== 'administrator') {
    throw new ErrorClass(401, 'Unauthorized acess, only administrator can access');
  }
  next();
};

module.exports = validateAdmin;
