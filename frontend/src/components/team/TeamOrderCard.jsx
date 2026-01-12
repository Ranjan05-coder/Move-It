import React from 'react';
import api from '../../api/axios';

export default function TeamOrderCard({ order, onActionComplete }) {

  const notifyDepart = async () => {
    await api.post(`/orders/${order._id}/depart`);
    onActionComplete();
  };

  const notifyArrive = async () => {
    await api.post(`/orders/${order._id}/arrive`);
    onActionComplete();
  };

  // ✅ Extract tracking
  const departed = order.tracking?.find(t => t.status === 'DEPARTED');
  const arrived = order.tracking?.find(t => t.status === 'ARRIVED');

 return (
  <div className="card mb-3">
    <div className="card-body">
      <h5>Order #{order._id.slice(-6)}</h5>

      <p><strong>Customer:</strong> {order.customer?.email}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Pickup:</strong> {order.pickupAddress}</p>
      <p><strong>Drop:</strong> {order.dropAddress}</p>

      {/* ALWAYS SHOW TIMES IF THEY EXIST */}
      {departed && (
        <p className="text-muted">
          🚚 <strong>Departed at:</strong>{' '}
          {new Date(departed.createdAt).toLocaleString()}
        </p>
      )}

      {arrived && (
        <p className="text-muted">
          📍 <strong>Arrived at:</strong>{' '}
          {new Date(arrived.createdAt).toLocaleString()}
        </p>
      )}

      {/* ACTION BUTTONS ONLY WHEN ALLOWED */}
      <div className="d-flex gap-2 mt-3">
        {order.status === 'ASSIGNED' && (
          <button className="btn btn-warning btn-sm" onClick={notifyDepart}>
            Notify Depart
          </button>
        )}

        {order.status === 'DEPARTED' && (
          <button className="btn btn-info btn-sm" onClick={notifyArrive}>
            Notify Arrive
          </button>
        )}
      </div>
    </div>
  </div>
);
s

}
