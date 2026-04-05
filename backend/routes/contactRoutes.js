const router = require('express').Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const contactController = require('../controllers/contactController');

/* =====================
   OPTIONAL AUTH MIDDLEWARE
   If token exists → attach req.user
   If not → continue as guest
===================== */
/* =====================
   USER / GUEST — SUBMIT MESSAGE
===================== */
router.post(
  '/',
  auth, // 🔥 require login
  contactController.submitMessage
);
/* =====================
   ADMIN — GET ALL MESSAGES
===================== */
router.get(
  '/',
  auth,
  permit('ADMIN'),
  contactController.getAllMessages
);

/* =====================
   USER — GET MY MESSAGES
===================== */
router.get(
  '/my',
  auth,
  contactController.getMyMessages
);

module.exports = router;
