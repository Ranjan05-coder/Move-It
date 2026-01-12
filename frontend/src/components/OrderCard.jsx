import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard({ order }) {
  const statusColor =
    order.status === 'paid'
      ? 'bg-success'
      : order.status === 'pending'
      ? 'bg-warning text-dark'
      : 'bg-secondary';

  return (
    <div className="card mb-3 shadow-sm" style={{ borderRadius: 12 }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          
          <div>
            <h5 className="mb-1">
              Order #{order._id?.slice(-6)}
            </h5>

            <p className="mb-1">
              <strong>Package:</strong> {order.package?.name}
            </p>

            <p className="mb-1 text-muted">
              <strong>Scheduled:</strong>{' '}
              {new Date(order.scheduledAt).toLocaleString()}
            </p>

            <p className="mb-0">
              <strong>Amount:</strong> ₹{order.package?.price}
            </p>
          </div>

          <div className="text-end">
            <span className={`badge ${statusColor} mb-2`}>
              {order.status?.toUpperCase()}
            </span>

            <div>
              <Link
                to={`/orders/${order._id}`}
                className="btn btn-sm btn-outline-primary"
              >
                View Details
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
