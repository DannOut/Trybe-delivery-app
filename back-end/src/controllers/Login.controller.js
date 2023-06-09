const { loginService } = require('../services');

const login = async (req, res, next) => {
  try {
    const user = await loginService(req.body);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

module.exports = login;