const { adminService } = require('../services');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await adminService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (e) {
    next(e);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = await adminService.registerUser(req.body);
    res.status(201).json({ ...newUser });
  } catch (e) {
    next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminService.deleteUserById(id);
    res.status(204).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  deleteUserById,
};