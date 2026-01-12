import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import OrderCard from '../components/OrderCard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MyOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ⛔ ROLE GUARD
  if (!user || user.role !== 'USER') {
    return (
      <div className="page-textured-bg">
        <div className="container-centered py-5">
          <div className="card elevated-card p-4 text-center">
            <h4 className="fw-semibold">Access Restricted</h4>
            <p className="text-muted mb-0">
              This page is available only for customers.
            </p>
          </div>
        </div>
      </div>
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
    <div className="page-textured-bg">

      {/* ================= PAGE HEADER ================= */}
      <section className="page-header text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">My Orders</h1>
          <p className="text-muted mt-2">
            Track and manage your moving requests.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="container-centered pb-5">

        {/* LOADING */}
        {loading && (
          <div className="card elevated-card p-4 text-center">
            <p className="text-muted mb-0">
              Loading your orders…
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="card elevated-card p-4 text-center">
            <p className="text-danger mb-0">{error}</p>
          </div>
        )}

        {/* ORDERS LIST */}
        {!loading && !error && orders.length > 0 && (
          <div className="row g-4">
            {orders.map(order => (
              <div className="col-12" key={order._id}>
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && orders.length === 0 && (
          <div className="card elevated-card p-5 text-center">
            <h5 className="fw-semibold mb-2">
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

      </section>
    </div>
  );
}
