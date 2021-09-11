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
    type: Boolean,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
