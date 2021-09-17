const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
  },
  path: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
  userEmails: [
    {
      type: String,
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;
