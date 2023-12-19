const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
