const Order = require('../models/Order');
const Package = require('../models/Package');
const Notification = require('../models/Notification');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


/* ===================== STATUS CONSTANTS ===================== */
const STATUS = {
  PLACED: 'PLACED',
  PAID: 'PAID',
  ASSIGNED: 'ASSIGNED',
  DEPARTED: 'DEPARTED',
  ARRIVED: 'ARRIVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

/* ===================== PRICE CALCULATOR ===================== */
const calcPrice = (pkg, addons = []) => {
  const basePrice = pkg.price || 0;
  const addonsPrice = addons.reduce((s, a) => s + (a.price || 0), 0);
  return { basePrice, addonsPrice, total: basePrice + addonsPrice };
};

/* ===================== SAFE NOTIFICATION ===================== */
const createNotificationOnce = async ({
  forRole,
  recipient = null,
  order,
  type,
  message
}) => {
  const exists = await Notification.findOne({
    forRole,
    recipient,
    order,
    type,
    read: false
  });

  if (!exists) {
    await Notification.create({
      forRole,
      recipient,
      order,
      type,
      message,
      read: false
    });
  }
};

/* ===================== USER — CREATE ORDER ===================== */
const createOrder = async (req, res) => {
  try {
    const { packageId, pickupAddress, dropAddress, scheduledAt } = req.body;

    if (!packageId || !pickupAddress || !dropAddress || !scheduledAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ error: 'Package not found' });

    const order = await Order.create({
      customer: req.user._id,
      package: pkg._id,
      pickupAddress,
      dropAddress,
      scheduledAt,
      priceBreakdown: calcPrice(pkg),
      payment: { method: 'mock', paid: false },
      status: STATUS.PLACED,
      tracking: [{ status: STATUS.PLACED, note: 'Order placed' }]
    });

    /* ADMIN NOTIFICATION */
    await createNotificationOnce({
      forRole: 'ADMIN',
      order: order._id,
      type: 'ORDER_PLACED',
      message: `New order placed (${order._id})`
    });

    /* USER NOTIFICATION */
    await createNotificationOnce({
      forRole: 'USER',
      recipient: order.customer,
      order: order._id,
      type: 'ORDER_PLACED_USER',
      message: 'Your order has been placed successfully'
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===================== USER — MARK PAID ===================== */
const markPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('package');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.payment?.status === 'SUCCESS') {
      return res.status(400).json({ error: 'Order already paid' });
    }

    order.payment = {
      method: 'mock',
      paymentId: `mock_${Date.now()}`,
      amount: order.package.price,
      currency: 'INR',
      status: 'SUCCESS',
      paidAt: new Date()
    };

    order.status = STATUS.PAID;

    order.tracking.push({
      status: STATUS.PAID,
      note: 'Payment successful'
    });

    await order.save();

    await createNotificationOnce({
      forRole: 'ADMIN',
      order: order._id,
      type: 'PAYMENT_SUCCESS',
      message: `Payment received for order ${order._id}`
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===================== ADMIN — ASSIGN TEAM ===================== */
const assignOrder = async (req, res) => {
  const { teamId } = req.body;
  const order = await Order.findById(req.params.id);

  order.assignedTeam = teamId;
  order.status = STATUS.ASSIGNED;
  order.tracking.push({ status: STATUS.ASSIGNED, note: 'Team assigned' });

  await order.save();

  /* TEAM NOTIFICATION */
  await createNotificationOnce({
    forRole: 'TEAM',
    recipient: teamId,
    order: order._id,
    type: 'TEAM_ASSIGNED',
    message: `You have been assigned order ${order._id}`
  });

  /* USER NOTIFICATION 🔥 FIX */
  await createNotificationOnce({
    forRole: 'USER',
    recipient: order.customer,
    order: order._id,
    type: 'TEAM_ASSIGNED_USER',
    message: 'Team has been assigned to your order'
  });

  res.json(order);
};

/* ===================== TEAM — DEPART ===================== */
const teamDepartNotify = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.status = STATUS.DEPARTED;
  order.tracking.push({ status: STATUS.DEPARTED, note: 'Team departed' });
  await order.save();

  await createNotificationOnce({
    forRole: 'USER',
    recipient: order.customer,   // 🔥 FIX
    order: order._id,
    type: 'ORDER_DEPARTED',
    message: 'Your order is on the way'
  });

  res.json({ success: true });
};

/* ===================== TEAM — ARRIVE ===================== */
const teamArriveNotify = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.status = STATUS.ARRIVED;
  order.tracking.push({ status: STATUS.ARRIVED, note: 'Team arrived' });
  await order.save();

  await createNotificationOnce({
    forRole: 'USER',
    recipient: order.customer,   // 🔥 FIX
    order: order._id,
    type: 'ORDER_ARRIVED',
    message: 'Your order has arrived'
  });

  res.json({ success: true });
};

/* ===================== ADMIN — COMPLETE ===================== */
const confirmCompletion = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.status = STATUS.COMPLETED;
  order.tracking.push({ status: STATUS.COMPLETED, note: 'Order completed' });
  await order.save();

  await createNotificationOnce({
    forRole: 'USER',
    recipient: order.customer,   // 🔥 FIX
    order: order._id,
    type: 'ORDER_COMPLETED',
    message: 'Your order has been completed'
  });

  res.json(order);
};

/* ===================== OTHER METHODS ===================== */

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id })
    .populate('package assignedTeam')
    .sort({ createdAt: -1 });

  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('package customer assignedTeam');

  if (!order) return res.status(404).json({ error: 'Order not found' });

  if (
    req.user.role === 'USER' &&
    String(order.customer._id) !== String(req.user._id)
  ) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json(order);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('package customer assignedTeam')
    .sort({ createdAt: -1 });

  res.json(orders);
};

const getTeamOrders = async (req, res) => {
  const orders = await Order.find({ assignedTeam: req.user._id })
    .populate('customer package')
    .sort({ createdAt: -1 });

  res.json(orders);
};

/* ===================== USER — FEEDBACK ===================== */
const submitFeedback = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.feedback = {
    comment: req.body.comment,
    submittedAt: new Date()
  };

  await order.save();

  res.json({ success: true });
};




/* ===================== CREATE RAZORPAY ORDER ===================== */
const createRazorpayOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('package');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const options = {
      amount: order.package.price * 100, // in paisa
      currency: 'INR',
      receipt: `receipt_${order._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save Razorpay order id in DB
    order.payment = {
      method: 'razorpay',
      razorpayOrderId: razorpayOrder.id,
      amount: order.package.price,
      currency: 'INR',
      status: 'PENDING'
    };

    await order.save();

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID

    });

  } catch (err) {
    console.error("Razorpay Create Error:", err);
    res.status(500).json({ error: err.message });
  }
};



/* ===================== VERIFY PAYMENT ===================== */
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // 🔥 Find order using razorpayOrderId (safer)
    const order = await Order.findOne({
      "payment.razorpayOrderId": razorpay_order_id
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.payment.paymentId = razorpay_payment_id;
    order.payment.status = "SUCCESS";
    order.payment.paidAt = new Date();
    order.status = STATUS.PAID;

    order.tracking.push({
      status: STATUS.PAID,
      note: "Payment successful"
    });

    await order.save();

    res.json({ success: true });

  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  createOrder,
  markPaid,
  getMyOrders,
  getAllOrders,
  getOrderById,
  assignOrder,
  teamDepartNotify,
  teamArriveNotify,
  submitFeedback,  
  confirmCompletion,
  getTeamOrders,
  createRazorpayOrder,
  verifyPayment,

};
