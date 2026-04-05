const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const orderController = require('../controllers/orderController');

/* =========================
   RAZORPAY ROUTES (ADD THIS FIRST)
========================= */

// Create Razorpay order
router.post(
  '/:id/razorpay/create',
  auth,
  permit('USER'),
  orderController.createRazorpayOrder
);

// Verify Razorpay payment
router.post(
  '/:id/razorpay/verify',
  auth,
  permit('USER'),
  orderController.verifyPayment
);

/* =========================
   ADMIN ROUTES
========================= */

router.get('/', auth, permit('ADMIN'), orderController.getAllOrders);

router.put('/:id/assign', auth, permit('ADMIN'), orderController.assignOrder);

router.put(
  '/:id/confirm-complete',
  auth,
  permit('ADMIN'),
  orderController.confirmCompletion
);

/* =========================
   TEAM ROUTES
========================= */

router.get('/team', auth, permit('TEAM'), orderController.getTeamOrders);

router.post(
  '/:id/depart',
  auth,
  permit('TEAM'),
  orderController.teamDepartNotify
);

router.post(
  '/:id/arrive',
  auth,
  permit('TEAM'),
  orderController.teamArriveNotify
);

/* =========================
   USER ROUTES
========================= */

router.post('/', auth, permit('USER'), orderController.createOrder);

router.get('/my', auth, permit('USER'), orderController.getMyOrders);

router.put('/:id/pay', auth, permit('USER'), orderController.markPaid);

router.post(
  '/:id/feedback',
  auth,
  permit('USER'),
  orderController.submitFeedback
);

/* =========================
   COMMON
========================= */

router.get('/:id', auth, orderController.getOrderById);

module.exports = router;
