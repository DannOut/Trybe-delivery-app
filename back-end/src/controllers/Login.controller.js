const { loginService } = require('../services');

const login = async (req, res) => {
    const token = await loginService(req.body);
    res.status(200).json({ token });
};

module.exports = login;
