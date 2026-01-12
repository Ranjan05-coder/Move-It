import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PackageCard from '../components/PackageCard';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/packages');

        // Optional: show popular packages first
        const sorted = [...res.data].sort(
          (a, b) => (b.isPopular === true) - (a.isPopular === true)
        );

        setPackages(sorted);
      } catch (err) {
        console.error('Failed to load packages', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="container-centered py-5">
      <h2 className="mb-2">Our Packages</h2>
      <p className="text-muted">
        Choose a plan that fits your moving needs
      </p>

      {loading && <p>Loading packages...</p>}

      {!loading && packages.length === 0 && (
        <p className="text-muted">No packages available yet.</p>
      )}

      <div className="row g-4 mt-3">
        {packages.map(pkg => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={pkg._id}>
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
    </div>
  );
}
