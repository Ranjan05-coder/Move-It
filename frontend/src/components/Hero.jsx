import React from 'react';
import { Link } from 'react-router-dom';
import heroTruck from '../assets/hero-truck.jpg';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container-centered text-center">
        <h1>Move With Joy</h1>

        <p className="mt-3 mb-4">
          Welcome to Move It — we provide exceptional moving services including packing,
          loading, transportation and delivery. Choose a package, schedule your moving
          time and we’ll send a professional team to make your move smooth.
        </p>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <Link to="/packages" className="btn btn-primary">
            Get a Quote
          </Link>
          <Link to="/contact" className="btn btn-outline-secondary">
            Contact Us
          </Link>
        </div>

        <div className="carousel-card mx-auto">
          <img
            src={heroTruck}
            alt="Moving truck"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </section>
  );
}
