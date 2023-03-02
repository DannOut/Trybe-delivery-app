const { Sale, User, SaleProduct } = require('../database/models');
const validateProducts = require('../validations/validateProducts');
const ErrorClass = require('../utils/ErrorClass');

const validatePersons = async (customerEmail, sellerEmail) => {
  const customer = await User
  .findOne({ where: { email: customerEmail, role: 'customer' }, raw: true });
  const seller = await User
  .findOne({ where: { email: sellerEmail, role: 'seller' }, raw: true });
  if (!customer) throw new ErrorClass(404, 'customer not Found');
  if (!seller) throw new ErrorClass(404, 'seller not Found');
  return { userId: customer.id, sellerId: seller.id };
};

const createProductsSale = async (saleId, products) => {
  const salesPromise = products.map(async (product) => {
    await SaleProduct.create({ saleId, productId: product.id, quantity: product.quantity });
  });
  await Promise.all(salesPromise);
};

const createSale = async (sale) => {
  const { userId, sellerId } = await validatePersons(sale.customerEmail, sale.sellerEmail);
  const newSale = await Sale.create({ ...sale, userId, sellerId, raw: true });
  validateProducts(sale.products, sale.totalPrice);
  await createProductsSale(newSale.id, sale.products);
  return newSale.dataValues;
};

module.exports = createSale;