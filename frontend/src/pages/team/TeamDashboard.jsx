import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function TeamDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const res = await api.get('/orders/team');
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load team orders');
    } finally {
      setLoading(false);
    }
  };

  const notify = async (id, action) => {
    try {
      await api.post(`/orders/${id}/${action}`);
      loadOrders(); // refresh after action
    } catch {
      alert('Action failed');
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    /* TYPE-1 Premium Background */
    <div className="bg-premium">
      <div className="container-centered py-4">

        {/* HEADER */}
        <h2 className="mb-4 fw-bold">Team Dashboard</h2>

        {/* LOADING */}
        {loading && (
          <p className="text-muted">Loading assigned orders...</p>
        )}

        {/* EMPTY STATE */}
        {!loading && orders.length === 0 && (
          <p className="text-muted">No assigned jobs yet.</p>
        )}

        {/* ORDERS */}
        {orders.map(order => (
          <div key={order._id} className="card mb-3 shadow-sm">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-semibold mb-0">
                  Order #{order._id.slice(-6)}
                </h6>
                <span className="badge bg-secondary">
                  {order.status}
                </span>
              </div>

              <p className="mb-1">
                <strong>Customer:</strong> {order.customer?.email || 'N/A'}
              </p>

              <p className="mb-3">
                <strong>Status:</strong> {order.status}
              </p>

              {/* ACTIONS */}
              <div className="d-flex gap-2">
                {order.status === 'ASSIGNED' && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => notify(order._id, 'depart')}
                  >
                    Notify Depart
                  </button>
                )}

                {order.status === 'DEPARTED' && (
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => notify(order._id, 'arrive')}
                  >
                    Notify Arrive
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
