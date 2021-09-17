const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: String,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  confirmed: {
    type: Boolean,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
