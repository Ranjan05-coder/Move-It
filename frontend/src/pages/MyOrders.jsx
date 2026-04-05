import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import OrderCard from '../components/OrderCard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from '../layout/DashboardLayout';

export default function MyOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ROLE GUARD
  if (!user || user.role !== 'USER') {
    return (
      <DashboardLayout>
        <div className="saas-card text-center">
          <h4>Access Restricted</h4>
          <p className="text-muted mb-0">
            This page is available only for customers.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/orders/my');
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>My Orders</h2>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">
              Loading your orders…
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="saas-card text-center">
            <p className="text-danger mb-0">{error}</p>
          </div>
        )}

        {/* ORDERS */}
        {!loading && !error && orders.length > 0 && (
          <div className="dashboard-section">
            {orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && orders.length === 0 && (
          <div className="saas-card text-center">
            <h5 className="mb-2">
              You haven’t booked any moves yet
            </h5>
            <p className="text-muted mb-4">
              Start by choosing a package that fits your needs.
            </p>

            <Link to="/packages" className="btn btn-primary">
              View Packages
            </Link>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}