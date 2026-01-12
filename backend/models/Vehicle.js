const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  regNo: String,
  type: { type: String, enum: ['van','truck','tempo'], default: 'van' },
  capacityCubicFeet: Number,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
