const express = require('express');
const cors = require('cors');
const errorHandler = require('../middlewares/ErrorHandler');
const {
  loginRouter,
  registerRouter,
  productsRouter,
  checkOutRouter,
  salesRouter,
} = require('../routes');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/images', express.static(`${__dirname}/../images`));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/checkout', checkOutRouter);
app.use('/sales', salesRouter);
app.use(errorHandler);

module.exports = app;
