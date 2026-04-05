const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema(
  {
    // Optional — only for logged-in users
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    // For guests OR logged-in users
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    // Admin reply (stored in same document)
    reply: {
      message: String,
      repliedAt: Date
    },

    status: {
      type: String,
      enum: ['NEW', 'READ', 'REPLIED'],
      default: 'NEW'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
