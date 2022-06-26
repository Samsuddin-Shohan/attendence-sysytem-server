const { Schema, model } = require('mongoose');

const studentAttendenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  adminAttendence: {
    type: Schema.Types.ObjectId,
    ref: 'AdminAttendence',
  },
});
const StudenAttendence = model('StudenAttendence', studentAttendenceSchema);

module.exports = StudenAttendence;
