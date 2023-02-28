const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');
const decodePassword = require('../validations/validatePassword');
const ErrorClass = require('../utils/ErrorClass');

const login = async (userLogin) => {
    const user = await User.findOne({ where: { email: userLogin.email }, raw: true });
    if (!user) throw new ErrorClass(404, 'Email or password are invalid');
    const hashPassword = decodePassword(userLogin.password);
    if (user.password !== hashPassword) throw new ErrorClass(404, 'Email or password are invalid');
    const { password, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);
    return token;
  };

module.exports = login;
