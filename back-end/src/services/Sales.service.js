const { Sale, Product, SaleProduct } = require('../database/models');
const ErrorClass = require('../utils/ErrorClass');
const { decodeToken } = require('../auth/jwtFunctions');

const getAllSales = async (id, token) => {
  const { role } = decodeToken(token);
  const roleFound = role === 'customer' ? 'userId' : 'sellerId';
  const sales = await Sale.findAll({ where: { [roleFound]: id }, raw: true });
  if (!sales) throw new ErrorClass(404, 'Sales not found!');
  return sales;
};

const getSalesById = async (id, token) => {
  const { role } = decodeToken(token);
  if (role === 'customer') throw new ErrorClass(401, 'Acess unauthorized');
  const checkSale = await Sale.findByPk(id);
  if (!checkSale) throw new ErrorClass(404, 'Sale not found!');
  const products = await SaleProduct.findAll({
    where: { saleId: id },
    attributes: ['quantity'],
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'urlImage'],
      }],
  });
  return { products, totalPrice: checkSale.totalPrice };
};

module.exports = {
  getAllSales,
  getSalesById,
};