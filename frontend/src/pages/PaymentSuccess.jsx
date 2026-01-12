import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <div className="container py-5 text-center">
      <h2>🎉 Booking Confirmed</h2>
      <p className="text-muted mt-2">
        Your payment was successful and your order has been placed.
      </p>

      <div className="mt-4">
        <Link to="/my-orders" className="btn btn-primary me-2">
          View My Orders
        </Link>
        <Link to="/" className="btn btn-outline-secondary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
