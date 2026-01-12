const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    forRole: {
      type: String,
      enum: ['ADMIN', 'USER', 'TEAM'],
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
