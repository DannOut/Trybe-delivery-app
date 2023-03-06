const loginRouter = require('./Login.routes');
const registerRouter = require('./Register.routes');
const productsRouter = require('./Products.routes');
const checkOutRouter = require('./CheckOut.routes');
const salesRouter = require('./Sales.routes');
const adminRouter = require('./Admin.routes');

module.exports = {
  loginRouter,
  registerRouter,
  productsRouter,
  checkOutRouter,
  salesRouter,
  adminRouter,
};