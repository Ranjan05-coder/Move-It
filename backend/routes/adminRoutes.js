const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const User = require('../models/User');
const ContactMessage = require('../models/ContactMessage');
const Notification = require('../models/Notification'); // ✅ ADD THIS
const Crew = require('../models/Crew');
const bcrypt = require('bcrypt');

/* =======================
   ADMIN – GET ALL USERS
======================= */
router.get(
  '/users',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const users = await User.find()
        .select('-passwordHash')
        .sort({ createdAt: -1 });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – CREATE ADMIN USER
======================= */
router.post(
  '/users/create-admin',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        passwordHash,
        role: 'ADMIN',
        isActive: true
      });

      console.log('✅ ADMIN USER CREATED:', email);

      res.status(201).json({
        message: 'Admin user created successfully',
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          isActive: newUser.isActive
        }
      });
    } catch (err) {
      console.error('❌ CREATE ADMIN ERROR:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/* =======================
   ADMIN – CREATE TEAM USER
======================= */
router.post(
  '/users/create-team',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        passwordHash,
        role: 'TEAM',
        isActive: true
      });

      console.log('✅ TEAM USER CREATED:', email);

      res.status(201).json({
        message: 'Team user created successfully',
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          isActive: newUser.isActive
        }
      });
    } catch (err) {
      console.error('❌ CREATE TEAM ERROR:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/* =======================
   ADMIN – UPDATE USER ROLE
======================= */
router.put(
  '/users/:id/role',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const { role } = req.body;

      if (!['USER', 'ADMIN', 'TEAM'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select('-passwordHash');

      console.log('✅ USER ROLE UPDATED:', user.email, role);

      res.json({
        message: 'User role updated',
        user
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – TOGGLE USER ACTIVE STATUS
======================= */
router.put(
  '/users/:id/toggle-active',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.isActive = !user.isActive;
      await user.save();

      console.log('✅ USER STATUS CHANGED:', user.email, user.isActive);

      res.json({
        message: user.isActive ? 'User activated' : 'User deactivated',
        user: user
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – DELETE USER
======================= */
router.delete(
  '/users/:id',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('✅ USER DELETED:', user.email);

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   CREW MANAGEMENT – GET CREW BY TEAM
======================= */
router.get(
  '/crew/:teamId',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const crew = await Crew.find({ team: req.params.teamId })
        .sort({ createdAt: -1 });
      res.json(crew);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   CREW MANAGEMENT – CREATE CREW MEMBER
======================= */
router.post(
  '/crew',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const { team, name, phone, email, role } = req.body;

      if (!team || !name) {
        return res.status(400).json({ message: 'Team and name required' });
      }

      // Verify team exists
      const teamUser = await User.findById(team);
      if (!teamUser || teamUser.role !== 'TEAM') {
        return res.status(404).json({ message: 'Team not found' });
      }

      const crewMember = await Crew.create({
        team,
        name,
        phone,
        email,
        role: role || 'Helper',
        isActive: true
      });

      console.log('✅ CREW MEMBER CREATED:', name);

      res.status(201).json(crewMember);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/* =======================
   CREW MANAGEMENT – UPDATE CREW MEMBER
======================= */
router.put(
  '/crew/:id',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const { name, phone, email, role, isActive } = req.body;

      const crew = await Crew.findByIdAndUpdate(
        req.params.id,
        { name, phone, email, role, isActive },
        { new: true }
      );

      if (!crew) {
        return res.status(404).json({ message: 'Crew member not found' });
      }

      console.log('✅ CREW MEMBER UPDATED:', crew.name);

      res.json(crew);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   CREW MANAGEMENT – DELETE CREW MEMBER
======================= */
router.delete(
  '/crew/:id',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const crew = await Crew.findByIdAndDelete(req.params.id);

      if (!crew) {
        return res.status(404).json({ message: 'Crew member not found' });
      }

      console.log('✅ CREW MEMBER DELETED:', crew.name);

      res.json({ message: 'Crew member deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – GET TEAM USERS
======================= */
router.get(
  '/teams',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const teams = await User.find({ role: 'TEAM' })
        .select('_id name email');
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – GET CONTACT MESSAGES
======================= */
router.get(
  '/messages',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const messages = await ContactMessage.find()
        .sort({ createdAt: -1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – MARK MESSAGE READ
======================= */
router.put(
  '/messages/:id/read',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const msg = await ContactMessage.findById(req.params.id);
      if (!msg) {
        return res.status(404).json({ error: 'Message not found' });
      }

      msg.status = 'READ';
      await msg.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN — REPLY TO MESSAGE ✅ (FIXED)
======================= */
router.post(
  '/messages/:id/reply',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const { replyMessage } = req.body;

      if (!replyMessage) {
        return res.status(400).json({ error: 'Reply message required' });
      }

      const msg = await ContactMessage.findById(req.params.id);
      if (!msg) {
        return res.status(404).json({ error: 'Message not found' });
      }

      // Save reply
      msg.reply = {
        message: replyMessage,
        repliedAt: new Date()
      };
      msg.status = 'REPLIED';
      await msg.save();

      /* 🔔 CREATE USER NOTIFICATION (CRITICAL FIX) */
      if (msg.user) {
        await Notification.create({
          forRole: 'USER',
          recipient: msg.user,
          type: 'CONTACT_REPLY',
          message: 'Admin replied to your message',
          link: '/contact',
          read: false
        });
      }

      return res.json({ success: true });
    } catch (err) {
      console.error('REPLY ERROR 👉', err);
      return res.status(500).json({ error: err.message });
    }
  }
);

/* =======================
   ADMIN – DELETE MESSAGE
======================= */
router.delete(
  '/messages/:id',
  auth,
  permit('ADMIN'),
  async (req, res) => {
    try {
      const msg = await ContactMessage.findById(req.params.id);
      if (!msg) {
        return res.status(404).json({ error: 'Message not found' });
      }

      await msg.deleteOne();
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
