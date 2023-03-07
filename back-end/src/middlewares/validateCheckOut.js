const ErrorClass = require('../utils/ErrorClass');

const verifyEmails = (customerEmail, sellerId) => {
  if (!customerEmail || !sellerId) return false;
  return true;
};

const validateCheckOut = (req, _res, next) => {
  const { customerEmail, sellerId, totalPrice, deliveryAddress, deliveryNumber } = req.body;
  const verifiedEmails = verifyEmails(customerEmail, sellerId);
  if (!verifiedEmails) throw new ErrorClass(404, 'Missing customerEmail or sellerEmail');
  if (!deliveryAddress) throw new ErrorClass(404, 'Missing deliveryAddress');
  if (!deliveryNumber) throw new ErrorClass(404, 'Missing deliveryNumber');
  if (!totalPrice) throw new ErrorClass(404, 'Missing totalPrice');
  next();
};

module.exports = validateCheckOut;