const User = require('../models/User');
const error = require('../utils/error');
const findUserByProperty = (key, value) => {
  let user;
  if (key == '_id') {
    return User.findById(value);
  }
  // console.log({ [key]: value });
  return User.findOne({ [key]: value });
};
const createNewUser = ({ name, email, password, accountStatus, roles }) => {
  const user = new User({
    name,
    password,
    email,
    accountStatus: accountStatus ? accountStatus : 'Pending',
    roles: roles ? roles : ['student'],
  });
  return user.save();
};
const updateUser = async (userId, data) => {
  const user = findUserByProperty('email', data.email);
  if (user) {
    error('email already in use', 404);
  }
  return await User.findByIdAndUpdate(userId, { ...data }, { new: true });
};
module.exports = {
  findUserByProperty,
  createNewUser,
  updateUser,
};
