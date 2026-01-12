import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/checkout?packageId=${pkg._id}`);
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">

        {/* Popular badge */}
        {pkg.isPopular && (
          <span className="badge bg-warning text-dark mb-2 align-self-start">
            Popular
          </span>
        )}

        <h5 className="card-title">{pkg.name}</h5>

        {pkg.description && (
          <p className="text-muted small">{pkg.description}</p>
        )}

        {/* Features */}
        {pkg.features && pkg.features.length > 0 && (
          <ul className="small mb-3">
            {pkg.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <h5 className="fw-bold mb-3">₹{pkg.price}</h5>

          {/* ✅ FIXED BUTTON */}
          <button
            className="btn btn-primary w-100"
            onClick={handleSelect}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
