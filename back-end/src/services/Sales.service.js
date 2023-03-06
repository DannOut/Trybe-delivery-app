const { Sale, Product, SaleProduct, User } = require('../database/models');
const ErrorClass = require('../utils/ErrorClass');
const { decodeToken } = require('../auth/jwtFunctions');
const validateChange = require('../validations/validateChangeStatus');

const getAllSales = async (token) => {
  const { role, email } = decodeToken(token);
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) throw new ErrorClass(401, 'email not found');
  const roleFound = role === 'customer' ? 'userId' : 'sellerId';
  const sales = await Sale.findAll({ where: { [roleFound]: user.id }, raw: true });
  if (!sales) throw new ErrorClass(404, 'Sales not found!');
  const { password, id, ...userWithoutPassword } = user;
  return { sales, user: { ...userWithoutPassword } };
};

const getAllSellers = async (token) => {
  const { role } = decodeToken(token);
  if (role === 'seller') throw new ErrorClass(401, 'Acess unauthorized');
  const allUsers = await User.findAll({
    where: { role: 'seller' },
    raw: true,
    attributes: ['name', 'email'],
});
  return allUsers;
};

const getSaleById = async (id) => {
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
  const { totalPrice, sellerId, saleDate, status } = checkSale;
  return { products, totalPrice, sellerId, saleDate, status, id: checkSale.id };
};

const changeStatus = async (id, token, newStatus) => {
  const { role, email } = decodeToken(token);
  const user = await User.findOne({ where: { email, role }, raw: true });
  if (!user) throw new ErrorClass(401, 'User not found');
  validateChange(role, newStatus);
  await Sale.update({ status: newStatus }, { where: { id } });
};

module.exports = {
  getAllSales,
  getSaleById,
  changeStatus,
  getAllSellers,
};