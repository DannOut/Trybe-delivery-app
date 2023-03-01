const express = require('express');
const errorHandler = require('../middlewares/ErrorHandler');
const { loginRouter, registerRouter } = require('../routes');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use(errorHandler);

module.exports = app;
