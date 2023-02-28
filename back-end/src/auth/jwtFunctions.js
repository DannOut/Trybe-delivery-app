const jwt = require('jsonwebtoken');
const ErrorClass = require('../utils/ErrorClass');

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ ...userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ErrorClass(401, 'Token not found');
    const payload = jwt.verify(authorization, secret);
  if (!payload) throw new ErrorClass(401, 'Token must be a valid token');
  next();
};

const decodeToken = (token) => {
  const tokenDecoded = jwt.decode(token);
    if (!tokenDecoded) throw new ErrorClass(401, 'Token must be a valid token');
  return tokenDecoded;
};

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
};