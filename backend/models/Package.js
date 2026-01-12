const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  features: [String],
  isPopular: { type: Boolean, default: false }
});

module.exports = mongoose.model('Package', packageSchema);
