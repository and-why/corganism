const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: {
    type: String,
  },
  description: {
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
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
});

const Job = mongoose.model('job', JobSchema);
module.exports = Job;
