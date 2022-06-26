const User = require('../models/User');
const error = require('../utils/error');
const userService = require('../services/userServices');

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User not found', 404);
    }
    res.status(200).json({ message: 'User is here', user });
  } catch (e) {
    next(e);
  }
};
const putUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, name, roles, accountStatus } = req.body;
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User does not exist', 404);
    }
    const updatedUser = await userService.updateUser(userId, {
      email,
      name,
      roles,
      accountStatus,
    });
    if (!updatedUser) {
      error('User not found', 404);
    }
    res.status(200).json({ message: 'updated success fully', updatedUser });
  } catch (e) {
    next(e);
  }
};
const patchUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, accountStatus, roles } = req.body;
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User does not exist', 404);
    }
    user.name = name ?? user.name;
    user.accountStatus = accountStatus ?? user.accountStatus;
    user.roles = roles ?? user.roles;
    await user.save();
    res.status(200).json({ message: 'user updated', user });
  } catch (e) {
    next(e);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.findUserByProperty('_id', userId);
    if (!user) {
      throw error('User does not exist', 404);
    }
    await user.remove();
    res.status(202).json({ message: 'Deleted successfully' });
  } catch (e) {
    next(e);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      throw error();
    }
    res.status(200).json({ message: 'users are here', users });
  } catch (e) {
    next(e);
  }
};
const postUser = async (req, res, next) => {
  const { name, email, password, accountStatus, roles } = req.body;
  const user = await userService.createNewUser({
    name,
    email,
    password,
    accountStatus,
    roles,
  });
  // console.log(user);
  res.status(200).json({ message: 'User created', user });
};

module.exports = {
  getUserById,
  putUserById,
  patchUserById,
  deleteUserById,
  getUsers,
  postUser,
};
