const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const User = require('../models/User');

// =======================
// ADMIN – GET TEAM USERS
// =======================
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

module.exports = router;
