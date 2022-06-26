const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  firsname: String,
  lastname: String,
  phone: String,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const profiles = model('Profiles', profileSchema);

module.exports = profiles;
