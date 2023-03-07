const { Sale, User, SaleProduct, Product } = require('../database/models');
const validateProducts = require('../validations/validateProducts');
const ErrorClass = require('../utils/ErrorClass');
const { decodeToken } = require('../auth/jwtFunctions');
const changeToNumber = require('../utils/ReplaceSaleValues');

const validatePersons = async (customerEmail, sellerId) => {
  const customer = await User
  .findOne({ where: { email: customerEmail, role: 'customer' }, raw: true });
  const seller = await User.findByPk(sellerId);
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

const checkProducts = async (products) => {
  const promise = await products.map(async (product) => {
    const productFound = await Product
    .findOne({ where: { id: product.id }, attributes: ['id', 'price', 'name'], raw: true });
  if (!productFound) throw new ErrorClass(404, 'product not Found');
  if (productFound.price !== product.price.toFixed(2)) {
    throw new ErrorClass(404, `product ${productFound.name} price is Incorrect`);
  }
    return { ...productFound };
  });
  await Promise.all(promise);
};

const createSale = async (newSale, authorization) => {
  const sale = changeToNumber(newSale, true);
  const token = decodeToken(authorization);
  const { email } = await User
  .findOne({ where: { email: sale.customerEmail, role: 'customer' }, raw: true });
  if (email !== token.email) throw new ErrorClass(404, 'User is not authorized');
  const { userId, sellerId } = await validatePersons(sale.customerEmail, sale.sellerId);
  const newSaleCreated = await Sale.create({ ...sale, userId, sellerId, raw: true });
  checkProducts(sale.products);
  validateProducts(sale.products, sale.totalPrice);
  await createProductsSale(newSaleCreated.dataValues.id, sale.products);
  const result = changeToNumber({ ...newSaleCreated.dataValues, products: sale.products }, false);
  return result;
};

module.exports = createSale;