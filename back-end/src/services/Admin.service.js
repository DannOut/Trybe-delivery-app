const { Op } = require('sequelize');
const { User } = require('../database/models');
const decodePassword = require('../validations/validatePassword');
const ErrorClass = require('../utils/ErrorClass');

const registerUser = async (newUser) => {
  const { role, email, name } = newUser;
  const user = await User.findOne({ where: { email }, raw: true });
  if (user) throw new ErrorClass(409, 'Email is already being used');
  const hashPassword = decodePassword(newUser.password);
  const userCreated = await User.create({ password: hashPassword, role, email, name });
  const { password, ...userWithoutPassword } = userCreated.dataValues;
  return { ...userWithoutPassword };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    where: { role: { [Op.not]: 'administrator' } },
    attributes: ['id', 'name', 'email', 'role'],
  });
  return allUsers;
};

const deleteUserById = async (id) => {
  const checkIfExists = await User.findByPk(id);
  if (!checkIfExists) throw new ErrorClass(404, 'User does not exists');
  await User.destroy({ where: { id } });
};

module.exports = {
  registerUser,
  deleteUserById,
  getAllUsers,
};