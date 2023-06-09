const { checkOutService } = require('../services');

const createSale = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const newSale = await checkOutService(req.body, authorization);
    res.status(201).json({ id: newSale.id });
  } catch (e) {
    next(e);
  }
};

module.exports = createSale;