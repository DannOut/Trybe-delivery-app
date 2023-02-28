const { JsonWebTokenError } = require('jsonwebtoken');
const ErrorClass = require('../utils/ErrorClass');

const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ErrorClass) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return res.status(500).json({ message: error.message });
};

module.exports = errorHandler;