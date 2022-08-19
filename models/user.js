const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
  user_id: String,
  username: String,
  password: String,
  fname: String,
  lname: String,
  age: Number,
  sex: {
    type: String,
    enum: ['male', 'female']
  }
});

module.exports = mongoose.model('User', userShcema);
