const { Sale, User } = require('../database/models');
const ErrorClass = require('../utils/ErrorClass');

const createSale = async (newSale) => {
  const customer = await User.findOne({ where: { email: newSale.customerEmail }, raw: true });
  const seller = await User.findOne({ where: { email: newSale.sellerEmail }, raw: true });
  if (!customer || !seller) throw new ErrorClass(404, 'customer or seller not Found');
  const newSaleCreated = await Sale
  .create({ ...newSale, userId: customer.id, sellerId: seller.id });
  return newSaleCreated.dataValues;
};

module.exports = createSale;