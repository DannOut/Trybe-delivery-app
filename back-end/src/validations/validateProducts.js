const ErrorClass = require('../utils/ErrorClass');

const checkTotalPrice = (totalPrice, products) => {
  const result = products
  .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
  if (result.toFixed(2) !== totalPrice.toFixed(2)) {
  throw new ErrorClass(404, 'totalPrice incorrect!');
  }
};

const validateProducts = (products, totalPrice) => {
  const productsId = products.map(({ id }) => id);
  const result = [];
  productsId.forEach((id) => {
    if (result.some((resId) => resId === id)) throw new ErrorClass(404, 'id product duplicated');
    result.push(id);
  });
  checkTotalPrice(totalPrice, products);
};

module.exports = validateProducts;