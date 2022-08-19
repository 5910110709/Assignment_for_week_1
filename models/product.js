const mongoose = require('mongoose');

const productShcema = new mongoose.Schema({
  pid: String,
  name: String,
  desc: String,
  price: Number,
  quantity: Number
});

module.exports = mongoose.model('Product', productShcema);
