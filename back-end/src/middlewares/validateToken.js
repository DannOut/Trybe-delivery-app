const ErrorClass = require('../utils/ErrorClass');
const { verifyToken } = require('../auth/jwtFunctions');

const validateToken = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new ErrorClass(404, 'Token not Found');
  verifyToken(token);
  next();
};

module.exports = validateToken;