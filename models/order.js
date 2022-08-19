const mongoose = require('mongoose');

const orderShcema = new mongoose.Schema({
  order_id: String,
  seller: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  total: Number,
  price: Number
});

module.exports = mongoose.model('Order', orderShcema);
