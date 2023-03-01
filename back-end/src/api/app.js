const express = require('express');
const errorHandler = require('../middlewares/ErrorHandler');
const cors = require('cors');
const { loginRouter, registerRouter, productsRouter } = require('../routes');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use(errorHandler);

module.exports = app;
