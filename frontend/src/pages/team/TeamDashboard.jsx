import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layout/DashboardLayout';

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
      loadOrders();
    } catch {
      alert('Action failed');
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const totalAssigned = orders.length;
  const inProgress = orders.filter(o => o.status === 'DEPARTED').length;
  const completed = orders.filter(o => o.status === 'COMPLETED').length;

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Team Dashboard</h2>
        </div>

        {/* METRICS */}
        <div className="dashboard-metrics">
          <div className="metric-card">
            <h4>{totalAssigned}</h4>
            <p>Assigned Jobs</p>
          </div>

          <div className="metric-card">
            <h4>{inProgress}</h4>
            <p>In Progress</p>
          </div>

          <div className="metric-card">
            <h4>{completed}</h4>
            <p>Completed</p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-muted">Loading assigned orders...</p>
        )}

        {/* EMPTY */}
        {!loading && orders.length === 0 && (
          <p className="text-muted">No assigned jobs yet.</p>
        )}

        {/* ORDER CARDS */}
        {!loading && orders.length > 0 && (
          <div className="dashboard-section">
            {orders.map(order => (
              <div key={order._id} className="saas-card">

                <div className="order-card-header">
                  <h6>Order #{order._id.slice(-6)}</h6>
                  <span className="status-badge">
                    {order.status}
                  </span>
                </div>

                <p>
                  <strong>Customer:</strong> {order.customer?.email || 'N/A'}
                </p>

                <div className="order-actions">
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
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}