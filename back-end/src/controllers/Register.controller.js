const { registerService } = require('../services');

const register = async (req, res, next) => {
  try {
    const newUser = await registerService(req.body);
    res.status(201).json({ ...newUser });
  } catch (e) {
    next(e);
  }
};

module.exports = register;