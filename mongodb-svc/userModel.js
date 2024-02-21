const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  reminders: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
