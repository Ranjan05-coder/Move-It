import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import NotificationPanel from '../../components/admin/NotificationPanel';
import OrderRow from '../../components/admin/OrderRow';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders'); // ADMIN API
      setOrders(res.data || []);
      setError('');
    } catch (err) {
      console.error('ADMIN LOAD ORDERS ERROR:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    /* TYPE-1: Premium Background */
    <div className="bg-premium">
      <div className="container-centered py-4">

        {/* HEADER */}
        <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

        {/* QUICK ACTIONS */}
        <div className="d-flex gap-2 mb-4">
          <Link to="/admin/packages" className="btn btn-outline-primary">
            Manage Packages
          </Link>
        </div>

        {/* NOTIFICATIONS */}
        <NotificationPanel />

        {/* ORDERS */}
        <h4 className="mt-4 mb-3 fw-semibold">All Orders</h4>

        {/* LOADING */}
        {loading && <p className="text-muted">Loading orders...</p>}

        {/* ERROR */}
        {!loading && error && (
          <p className="text-danger">{error}</p>
        )}

        {/* EMPTY */}
        {!loading && !error && orders.length === 0 && (
          <p className="text-muted">No orders found.</p>
        )}

        {/* TABLE */}
        {!loading && orders.length > 0 && (
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>User</th>
                    <th>Package</th>
                    <th>Status</th>
                    <th>Team</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <OrderRow
                      key={order._id}
                      order={order}
                      onActionComplete={loadOrders}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
