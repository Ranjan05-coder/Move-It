import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my')
      .then(res => setOrders(res.data || []))
      .catch(() => {});
  }, []);

  const total = orders.length;

  const active = orders.filter(o =>
    ['PLACED', 'PAID', 'ASSIGNED', 'DEPARTED', 'ARRIVED']
      .includes(o.status)
  ).length;

  const completed = orders.filter(o =>
    o.status === 'COMPLETED'
  ).length;

  const recentOrders = [...orders]
    .sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>User Dashboard</h2>
        </div>

        {/* METRICS */}
        <div className="dashboard-metrics">
          <div className="metric-card">
            <h4>{total}</h4>
            <p>Total Orders</p>
          </div>

          <div className="metric-card">
            <h4>{active}</h4>
            <p>Active Orders</p>
          </div>

          <div className="metric-card">
            <h4>{completed}</h4>
            <p>Completed</p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="dashboard-section">
          <h4>Recent Orders</h4>

          {recentOrders.length === 0 && (
            <div className="saas-card text-center">
              <p className="text-muted mb-0">
                No recent orders found.
              </p>
            </div>
          )}

          {recentOrders.map(order => (
            <div key={order._id} className="saas-card recent-order-card">

              <div className="recent-order-left">
                <strong>Order #{order._id.slice(-6)}</strong>
                <div className="text-muted small">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="recent-order-right">
                <span className="status-badge">
                  {order.status}
                </span>

                <Link
                  to={`/orders/${order._id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}