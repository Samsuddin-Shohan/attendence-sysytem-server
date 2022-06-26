const { Schema, model } = require('mongoose');

const adminAttendenceSchema = new Schema(
  {
    timeLimit: {
      type: Number,
      required: true,
      max: 30,
      min: 1,
      default: 5,
    },
    status: {
      type: String,
      enum: ['RUNNING', 'COMPLETED'],
      default: 'RUNNING',
    },
  },
  { timestamps: true }
);
const AdminAttendence = model('AdminAttendence', adminAttendenceSchema);
module.exports = AdminAttendence;
