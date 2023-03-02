const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');
const decodePassword = require('../validations/validatePassword');
const ErrorClass = require('../utils/ErrorClass');

const register = async (newUser) => {
  const checkIfExists = await User.findOne({ where: { email: newUser.email }, raw: true });
    if (checkIfExists) throw new ErrorClass(409, 'User already exists');
    const hashPassword = decodePassword(newUser.password);
    const userCreated = await User
    .create({ ...newUser, password: hashPassword, role: 'customer' });
    const { password, id, ...userWithoutPassword } = userCreated.dataValues;
    const token = createToken(userWithoutPassword);
    return { token, ...userWithoutPassword };
  };

module.exports = register;