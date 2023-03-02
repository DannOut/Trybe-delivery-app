const express = require('express');
const cors = require('cors');
const errorHandler = require('../middlewares/ErrorHandler');
const { loginRouter, registerRouter, productsRouter, checkOutRouter } = require('../routes');

const app = express();
app.use(cors());
const teste = __dirname + "images";
console.log('teste :>> ', teste);

app.use(express.json());
app.use("/images", express.static(teste));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/checkout', checkOutRouter);
app.use(errorHandler);

module.exports = app;
