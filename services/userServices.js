const User = require('../models/User');
const findUserByProperty = (key, value) => {
  let user;
  if (key == '_id') {
    return User.findById(value);
  }
  // console.log({ [key]: value });
  return User.findOne({ [key]: value });
};
const createNewUser = ({ name, email, password }) => {
  const user = new User({ name, password, email });
  return user.save();
};

module.exports = {
  findUserByProperty,
  createNewUser,
};
