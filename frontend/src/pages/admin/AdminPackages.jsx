import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layout/DashboardLayout';

const emptyPackage = {
  name: '',
  price: '',
  description: '',
  features: '',
  isPopular: false
};

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPackages = async () => {
    const res = await api.get('/packages');
    setPackages(res.data);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const savePackage = async () => {
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      features: form.features
        ? form.features.split(',').map(f => f.trim())
        : []
    };

    try {
      if (form._id) {
        await api.put(`/packages/${form._id}`, payload);
      } else {
        await api.post('/packages', payload);
      }

      setForm(null);
      loadPackages();
    } catch (err) {
      alert('Failed to save package');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Package Management</h2>

          <button
            className="btn btn-success"
            onClick={() => setForm({ ...emptyPackage })}
          >
            + Add Package
          </button>
        </div>

        {/* PACKAGE TABLE */}
        <div className="saas-card">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Features</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg._id}>
                    <td>{pkg.name}</td>
                    <td>₹{pkg.price}</td>
                    <td>{pkg.description}</td>
                    <td>{pkg.features?.join(', ')}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          setForm({
                            ...pkg,
                            features: pkg.features?.join(', ')
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FORM */}
        {form && (
          <div className="saas-card">
            <h5>{form._id ? 'Edit Package' : 'Add Package'}</h5>

            <input
              className="form-control mb-2"
              placeholder="Package name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="form-control mb-2"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />

            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={form.description}
              onChange={e =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={e =>
                setForm({ ...form, features: e.target.value })
              }
            />

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.isPopular}
                onChange={e =>
                  setForm({ ...form, isPopular: e.target.checked })
                }
              />
              <label className="form-check-label">
                Mark as Popular
              </label>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                disabled={loading}
                onClick={savePackage}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setForm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}