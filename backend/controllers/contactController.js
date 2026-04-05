
const ContactMessage = require('../models/ContactMessage');
const Notification = require('../models/Notification');

/* =====================
   USER / GUEST — SUBMIT MESSAGE
===================== */

const User = require('../models/User');

exports.submitMessage = async (req, res) => {
  try {
    let name;
    let email;

    if (req.user) {
      // 🔥 Fetch full user from DB
      const dbUser = await User.findById(req.user._id);

      if (!dbUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      name = dbUser.name;
      email = dbUser.email;
    } else {
      name = req.body.name;
      email = req.body.email;
    }

    const { message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const newMsg = await ContactMessage.create({
      user: req.user ? req.user._id : null,
      name,
      email,
      message
    });

    res.status(201).json(newMsg);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =====================
   ADMIN — GET ALL MESSAGES
===================== */
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* =====================
   USER — GET MY MESSAGES (CHAT HISTORY)
===================== */
exports.getMyMessages = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Login required' });
    }

    // 🔴 Step 1 — Mark all REPLIED messages as READ
    await ContactMessage.updateMany(
      {
        user: req.user._id,
        status: 'REPLIED'
      },
      {
        status: 'READ'
      }
    );

    // 🔵 Step 2 — Fetch updated messages
    const messages = await ContactMessage.find({
      user: req.user._id
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};