const { Schema, model } = require('mongoose');
const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 6,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  roles: {
    type: [String],
    default: ['student'],
  },
  accountStatus: {
    type: String,
    enum: ['Pending', 'Active', 'Rejected'],
    default: 'Pending',
  },
});

const users = model('users', userSchema);

module.exports = users;
