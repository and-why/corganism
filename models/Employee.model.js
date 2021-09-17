const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  position: {
    type: String,
  },
  image: {
    type: String,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;
