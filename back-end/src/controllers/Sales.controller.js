const { salesService } = require('../services');

const getAllSales = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const allSales = await salesService.getAllSales(authorization);
    res.status(200).json(allSales);
  } catch (e) {
    next(e);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const saleById = await salesService.getSaleById(id, authorization);
    res.status(200).json(saleById);
  } catch (e) {
    next(e);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { status } = req.body;
    await salesService.changeStatus(id, authorization, status);
    res.status(200).json({ status: 'Updated status' });
  } catch (e) {
    next(e);
  }
};

const getAllSellers = async (req, res, next) => {
  try {
  const { authorization } = req.headers;
  const allSellers = await salesService.getAllSellers(authorization);
  res.status(200).json(allSellers);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  changeStatus,
  getAllSellers,
};