import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

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
      <div className="container-centered py-5 text-center">
        <h3>Invalid payment request</h3>
      </div>
    );
  }

  const handlePay = async () => {
    try {
      setPaying(true);
      await api.put(`/orders/${orderId}/pay`);
      navigate('/payment-success');
    } catch {
      alert('Payment failed');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="container-centered py-5">
      <h2 className="text-center mb-4">Payment</h2>

      {order && (
        <div className="card mx-auto" style={{ maxWidth: 500 }}>
          <div className="card-body">
            <h5>{order.package?.name}</h5>
            <p className="text-muted">{order.package?.description}</p>
            <hr />
            <p><strong>Pickup:</strong> {order.pickupAddress}</p>
            <p><strong>Drop:</strong> {order.dropAddress}</p>
            <p><strong>Schedule:</strong> {new Date(order.scheduledAt).toLocaleString()}</p>
            <hr />
            <h4 className="text-end">₹{order.package?.price}</h4>

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
  );
}
