import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const loadOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const submitFeedback = async () => {
    if (!comment.trim()) {
      alert('Please write feedback');
      return;
    }

    try {
      setLoading(true);
      await api.post(`/orders/${order._id}/feedback`, { comment });
      setComment('');
      loadOrder();
    } catch (err) {
      alert('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <div className="page-textured-bg">
        <div className="container-centered py-5 text-center">
          <p className="text-muted">Loading order details…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-textured-bg">

      {/* ================= PAGE HEADER ================= */}
      <section className="page-header text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">Order Details</h1>
          <p className="text-muted mt-2">
            Track your move and view progress in real time.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="container-centered pb-5">

        {/* ORDER SUMMARY */}
        <div className="card elevated-card mb-4">
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Order Summary</h5>

            <div className="row g-3 text-muted">
              <div className="col-md-6">
                <strong>Package:</strong><br />
                {order.package?.name}
              </div>

              <div className="col-md-6">
                <strong>Status:</strong><br />
                <span className="badge bg-primary">
                  {order.status}
                </span>
              </div>

              <div className="col-md-6">
                <strong>Pickup Address:</strong><br />
                {order.pickupAddress}
              </div>

              <div className="col-md-6">
                <strong>Drop Address:</strong><br />
                {order.dropAddress}
              </div>

              <div className="col-md-6">
                <strong>Scheduled Time:</strong><br />
                {new Date(order.scheduledAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="card elevated-card mb-4">
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Order Tracking</h5>

            <ul className="tracking-timeline">
              {order.tracking.map((t, i) => (
                <li key={i} className="active">
                  <span className="dot"></span>
                  <div>
                    <strong>{t.status}</strong>
                    <div className="text-muted small">
                      {t.note || 'Status updated'} •{' '}
                      {new Date(t.timestamp || t.createdAt).toLocaleString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FEEDBACK SECTION */}
        {order.status === 'ARRIVED' && !order.feedback && (
          <div className="card elevated-card mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                Complete Your Order
              </h5>

              <p className="text-muted">
                Please share your experience to help us improve.
              </p>

              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Write your feedback here..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />

              <button
                className="btn btn-success"
                disabled={loading}
                onClick={submitFeedback}
              >
                {loading ? 'Submitting…' : 'COMPLETE'}
              </button>
            </div>
          </div>
        )}

        {/* COMPLETED MESSAGE */}
        {order.status === 'COMPLETED' && (
          <div className="card elevated-card text-center p-4">
            <h5 className="fw-semibold mb-2">
              🎉 Order Completed
            </h5>
            <p className="text-muted mb-0">
              Thank you for choosing MoveIt. We hope to serve you again!
            </p>
          </div>
        )}

      </section>
    </div>
  );
}
