const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { findUserByProperty, createNewUser } = require('./userServices');
const error = require('../utils/error');

const loginServices = async ({ email, password }) => {
  let user = await findUserByProperty('email', email);
  if (!user) {
    throw error('User could not found ', 401);
  }

  let isMatch = await bcrypt.compare(password, user.password);
  // console.log(isMatch);
  if (!isMatch) {
    throw error('Password is incorrect', 401);
  }
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  const token = jwt.sign(payload, 'secret-key');
  return token;
};
const registerServices = async ({
  email,
  password,
  name,
  accountStatus,
  roles,
}) => {
  let user = await findUserByProperty('email', email);
  if (user) {
    throw error('User Already existed', 400);
  }
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  return createNewUser({ name, email, password: hash, accountStatus, roles });
};
module.exports = {
  loginServices,
  registerServices,
};
