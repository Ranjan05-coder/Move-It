import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('packageId');

  const [pkg, setPkg] = useState(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ⛔ ROLE GUARD */
  if (!user || user.role !== 'USER') {
    return (
      <div className="page-textured-bg">
        <div className="container-centered py-5 text-center">
          <h3>Access Restricted</h3>
          <p className="text-muted">
            Only customers can place orders.
          </p>
        </div>
      </div>
    );
  }

  /* ✅ LOAD PACKAGE SAFELY */
  useEffect(() => {
    if (!packageId) return;

    const loadPackage = async () => {
      try {
        const res = await api.get('/packages');
        const found = res.data.find(p => p._id === packageId);
        setPkg(found || null);
      } catch (err) {
        console.error('Failed to load package', err);
      }
    };

    loadPackage();
  }, [packageId]);

  /* ✅ SUBMIT ORDER */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packageId) {
      alert('Package not selected');
      return;
    }

    if (!pickup || !drop || !scheduledAt) {
      alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        packageId,
        pickupAddress: pickup,
        dropAddress: drop,
        scheduledAt: new Date(scheduledAt).toISOString()
      };

      console.log('ORDER PAYLOAD →', payload);

      const res = await api.post('/orders', payload);

      navigate('/payment', {
        state: { orderId: res.data._id }
      });

    } catch (err) {
      console.error('ORDER ERROR:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-textured-bg">

      {/* HEADER */}
      <section className="page-header text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">Checkout</h1>
          <p className="text-muted mt-2">
            Confirm your pickup and delivery details
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container-centered pb-5">
        <div className="row g-4">

          {/* LEFT — FORM */}
          <div className="col-md-6">
            <div className="card elevated-card p-4">
              <h5 className="fw-semibold mb-3">
                Pickup & Delivery Details
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Pickup Address</label>
                  <input
                    className="form-control"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Drop Address</label>
                  <input
                    className="form-control"
                    placeholder="Enter drop location"
                    value={drop}
                    onChange={e => setDrop(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Schedule Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={scheduledAt}
                    onChange={e => setScheduledAt(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? 'Processing…' : 'Confirm & Proceed to Payment'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT — PACKAGE SUMMARY */}
          <div className="col-md-6">
            {pkg ? (
              <div className="card elevated-card h-100">
                <div className="card-body">
                  <h5 className="fw-semibold mb-2">
                    Selected Package
                  </h5>

                  <p className="fw-semibold mb-1">{pkg.name}</p>
                  <p className="text-muted">{pkg.description}</p>

                  {pkg.features?.length > 0 && (
                    <ul className="text-muted small">
                      {pkg.features.map((f, i) => (
                        <li key={i}>✔ {f}</li>
                      ))}
                    </ul>
                  )}

                  <hr />

                  <p className="fw-semibold mb-0">Total Price</p>
                  <p className="fs-4 fw-bold text-primary">
                    ₹{pkg.price}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted">Loading package details…</p>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
