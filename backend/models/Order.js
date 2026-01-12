const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  // CUSTOMER
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // PACKAGE
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },

  additionalServices: [{ name: String, price: Number }],

  // ADDRESSES
  pickupAddress: { type: String, required: true },
  dropAddress: { type: String, required: true },
  scheduledAt: { type: Date, required: true },

  // PRICING
  priceBreakdown: {
    basePrice: Number,
    addonsPrice: { type: Number, default: 0 },
    total: Number
  },

  // PAYMENT
  payment: {
    method: { type: String, enum: ['stripe', 'cod', 'mock'], default: 'mock' },
    paid: { type: Boolean, default: false },
    paymentId: String,
    paidAt: Date
  },

  // ASSIGNED TEAM
  assignedTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  // SINGLE STATUS FIELD
  status: {
    type: String,
    enum: [
      'PLACED',
      'PAID',
      'ASSIGNED',
      'DEPARTED',
      'ARRIVED',
      'COMPLETED',
      'CANCELLED'
    ],
    default: 'PLACED'
  },

  // FEEDBACK (REQUIRED BEFORE COMPLETION)
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    submittedAt: Date
  },

  // TRACKING HISTORY (ADMIN CONFIRMED)
  tracking: [
    {
      status: String,
      note: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
