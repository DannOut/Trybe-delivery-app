const { loginService } = require('../services');

const login = async (req, res, next) => {
  try {
    const token = await loginService(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = login;