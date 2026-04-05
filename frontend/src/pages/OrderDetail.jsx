import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import DashboardLayout from '../layout/DashboardLayout';

/* ================= TRACKING CONFIG ================= */

const TRACKING_STEPS = [
  { key: 'PLACED', label: 'Order Placed', icon: '📝' },
  { key: 'PAID', label: 'Payment Confirmed', icon: '💳' },
  { key: 'ASSIGNED', label: 'Team Assigned', icon: '👷' },
  { key: 'DEPARTED', label: 'Out for Pickup', icon: '🚚' },
  { key: 'ARRIVED', label: 'Arrived at Destination', icon: '📍' },
  { key: 'COMPLETED', label: 'Order Completed', icon: '✅' }
];

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const loadOrder = async () => {
    const res = await api.get(`/orders/${id}`);
    setOrder(res.data);
  };

  useEffect(() => {
    loadOrder();
    const interval = setInterval(loadOrder, 20000);
    return () => clearInterval(interval);
  }, [id]);

  const submitFeedback = async () => {
    if (!comment.trim()) return alert('Please write feedback');

    try {
      setLoading(true);
      await api.post(`/orders/${order._id}/feedback`, { comment });
      setComment('');
      loadOrder();
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <DashboardLayout>
        <div className="saas-card text-center">
          <p className="text-muted mb-0">Loading order details…</p>
        </div>
      </DashboardLayout>
    );
  }

  const latestStatus =
    order.tracking[order.tracking.length - 1]?.status;

  const completedSet = new Set(
    order.tracking.map(t => t.status)
  );

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Order Tracking</h2>
        </div>

        {/* ORDER SUMMARY */}
        <motion.div
          className="saas-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4 pb-4 border-b border-primary-200/30">
            <h5 className="mb-3 text-lg font-bold text-neutral-900">📦 Order Summary</h5>
          </div>

          <div className="order-summary-grid">

            <div>
              <strong>Order ID:</strong><br />
              <code className="text-primary-600 font-mono">
                {order._id?.slice(-8)}
              </code>
            </div>

            <div>
              <strong>Package:</strong><br />
              {order.package?.name}
            </div>

            <div>
              <strong>Status:</strong><br />
              <span
                className={`status-badge ${
                  order.status === 'COMPLETED'
                    ? 'status-badge-success'
                    : order.status === 'PAID'
                    ? 'status-badge-info'
                    : order.status === 'PLACED'
                    ? 'status-badge-warning'
                    : 'status-badge-error'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div>
              <strong>📍 Pickup:</strong><br />
              {order.pickupAddress}
            </div>

            <div>
              <strong>📍 Drop:</strong><br />
              {order.dropAddress}
            </div>

            <div>
              <strong>⏰ Scheduled:</strong><br />
              {new Date(order.scheduledAt).toLocaleDateString()}<br />
              <span className="text-sm text-neutral-600">
                {new Date(order.scheduledAt).toLocaleTimeString()}
              </span>
            </div>

            {order.price && (
              <div>
                <strong>💰 Amount:</strong><br />
                <span className="text-lg font-bold text-primary-600">
                  ₹{order.price}
                </span>
              </div>
            )}

            {order.createdAt && (
              <div>
                <strong>📅 Order Date:</strong><br />
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            )}

          </div>
        </motion.div>

        {/* TRACKING */}
        <motion.div 
          className="saas-card mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-6 pb-4 border-b border-primary-200/30">
            <h5 className="mb-1 text-lg font-bold text-neutral-900">🚚 Tracking Progress</h5>
            <p className="text-sm text-neutral-600">Follow your order journey in real-time</p>
          </div>

          <div className="tracking-vertical">
            {TRACKING_STEPS.map((step, index) => {
              const backendStep = order.tracking.find(
                t => t.status === step.key
              );

              const isLast = index === TRACKING_STEPS.length - 1;
              const isCompleted = completedSet.has(step.key);
              const isCurrent = order.status === step.key;

              return (
                <motion.div
                  key={step.key}
                  className={`tracking-row
                    ${isCompleted ? 'done' : ''}
                    ${isCurrent ? 'current' : ''}
                    ${step.key === latestStatus ? 'just-updated' : ''}
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="tracking-icon-col">
                    <motion.div 
                      className="tracking-icon"
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.icon}
                    </motion.div>
                    {!isLast && <div className="tracking-line" />}
                  </div>

                  <div className="tracking-content pb-4">
                    <div className="fw-semibold">
                      {step.label}
                      {isCompleted && ' ✓'}
                      {isCurrent && ' ⏸'}
                    </div>

                    {backendStep ? (
                      <>
                        <div className="text-muted small">
                          {backendStep.note || 'Status updated'}
                        </div>
                        <div className="text-muted small">
                          {new Date(
                            backendStep.timestamp || backendStep.createdAt
                          ).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <div className="text-muted small fst-italic">
                        ⏳ Pending
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* FEEDBACK */}
        {order.status === 'ARRIVED' && !order.feedback && (
          <motion.div
            className="saas-card mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 pb-4 border-b border-primary-200/30">
              <h5 className="mb-1 text-lg font-bold text-neutral-900">✍️ Complete Your Order</h5>
              <p className="text-sm text-neutral-600">Share your feedback to help us improve</p>
            </div>

            <textarea
              className="form-control mb-4"
              rows="5"
              placeholder="Write your feedback about the service…"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <button
              className="btn btn-success"
              disabled={loading}
              onClick={submitFeedback}
            >
              {loading ? '⏳ Submitting…' : '✓ COMPLETE ORDER'}
            </button>
          </motion.div>
        )}

        {/* COMPLETED */}
        {order.status === 'COMPLETED' && (
          <motion.div
            className="saas-card text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-5xl mb-4">🎉</div>
            <h5 className="mb-2 text-xl font-bold">Order Completed Successfully!</h5>
            <p className="text-neutral-600 mb-0">
              Thank you for choosing MoveIt. Your feedback helps us serve you better.
            </p>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}