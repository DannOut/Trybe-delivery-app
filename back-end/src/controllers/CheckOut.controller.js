const { checkOutService } = require('../services');

const createSale = async (req, res, next) => {
  try {
    const newSale = await checkOutService(req.body);
    res.status(201).json({ ...newSale });
  } catch (e) {
    next(e);
  }
};

module.exports = createSale;