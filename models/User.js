const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  provider: String,
  date: Number
});

module.exports = User = mongoose.model('user', userSchema);
