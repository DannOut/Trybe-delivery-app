const express = require('express');
const errorHandler = require('../middlewares/ErrorHandler');
const { loginRouter } = require('../routes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use(errorHandler);

module.exports = app;
