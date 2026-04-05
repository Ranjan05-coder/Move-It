import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layout/DashboardLayout';

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;

  const [order, setOrder] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    api.get(`/orders/${orderId}`)
      .then(res => setOrder(res.data))
      .catch(() => alert('Failed to load order'));
  }, [orderId]);

  if (!orderId) {
    return (
      <DashboardLayout>
        <div className="saas-card text-center">
          <h4>Invalid payment request</h4>
        </div>
      </DashboardLayout>
    );
  }

  /* ===================== REAL RAZORPAY PAYMENT ===================== */
  const handlePay = async () => {
    try {
      setPaying(true);

      const { data } = await api.post(`/orders/${orderId}/razorpay/create`);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,
        name: "MoveIt",
        description: "Order Payment",
        handler: async function (response) {
          try {
            await api.post(`/orders/${orderId}/razorpay/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            navigate('/payment-success');
          } catch {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: order?.customer?.name || "",
          email: order?.customer?.email || ""
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert('Payment failed');
    } finally {
      setPaying(false);
    }
  };
  /* ================================================================ */

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h2>Secure Payment</h2>
        </div>

        {order && (
          <div className="payment-grid">

            {/* ORDER SUMMARY */}
            <div className="saas-card">
              <h5 className="mb-3">Order Summary</h5>

              <p><strong>Package:</strong> {order.package?.name}</p>
              <p className="text-muted">{order.package?.description}</p>

              <hr />

              <p><strong>Pickup:</strong> {order.pickupAddress}</p>
              <p><strong>Drop:</strong> {order.dropAddress}</p>
              <p>
                <strong>Schedule:</strong>{" "}
                {new Date(order.scheduledAt).toLocaleString()}
              </p>
            </div>

            {/* PAYMENT CARD */}
            <div className="saas-card payment-card">
              <h5 className="mb-3">Payment Details</h5>

              <div className="payment-amount">
                ₹{order.package?.price}
              </div>

              <p className="text-muted small">
                Secured by Razorpay • 256-bit encryption
              </p>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handlePay}
                disabled={paying}
              >
                {paying ? 'Processing…' : 'Pay Now'}
              </button>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}