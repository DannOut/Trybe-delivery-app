const jwt = require('jsonwebtoken');
const fs = require('fs');
const ErrorClass = require('../utils/ErrorClass');
require('dotenv').config();

const jwtEvaluation = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ ...userWithoutPassword }, jwtEvaluation);
  return token;
};

const verifyToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ErrorClass(401, 'Token not found');
    const payload = jwt.verify(authorization, jwtEvaluation);
  if (!payload) throw new ErrorClass(401, 'Token must be a valid token');
  next();
};

const decodeToken = (token) => {
  const tokenDecoded = jwt.decode(token, jwtEvaluation);
    if (!tokenDecoded) throw new ErrorClass(401, 'Token must be a valid token');
  return tokenDecoded;
};

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
};
