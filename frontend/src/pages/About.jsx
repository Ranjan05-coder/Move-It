export default function About() {
  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="page-hero text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">About MoveIt</h1>
          <p className="text-muted mt-2">
            Making relocation simple, secure, and stress-free.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="container-centered py-5">
        <h3 className="fw-semibold mb-3">Who We Are</h3>

        <p className="text-muted">
          MoveIt is a modern logistics and relocation platform built to simplify
          home and office moving for individuals and businesses.
        </p>

        <p className="text-muted">
          By combining technology, trained professionals, and transparent
          pricing, we ensure your belongings move safely, efficiently, and
          without stress.
        </p>
      </section>

      {/* ================= WHY MOVEIT ================= */}
      <section className="section-soft-bg">
        <div className="container-centered py-5">
          <h3 className="fw-semibold mb-4">Why MoveIt</h3>

          <div className="row g-4">
            <div className="col-md-4">
              <h5 className="fw-semibold">Safety First</h5>
              <p className="text-muted">
                Insurance-backed services and careful handling of every item.
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="fw-semibold">Timely Delivery</h5>
              <p className="text-muted">
                Scheduled pickups and reliable delivery commitments.
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="fw-semibold">Transparent Pricing</h5>
              <p className="text-muted">
                No hidden costs — clear and honest pricing from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="container-centered py-5">
        <h3 className="fw-semibold mb-4">How It Works</h3>

        <div className="row text-center g-4">
          <div className="col-md-3">
            <h5 className="fw-semibold">1. Book</h5>
            <p className="text-muted">
              Select a package and schedule your move online.
            </p>
          </div>

          <div className="col-md-3">
            <h5 className="fw-semibold">2. Pickup</h5>
            <p className="text-muted">
              Our trained team arrives and secures your belongings.
            </p>
          </div>

          <div className="col-md-3">
            <h5 className="fw-semibold">3. Transport</h5>
            <p className="text-muted">
              Safe transportation with real-time tracking updates.
            </p>
          </div>

          <div className="col-md-3">
            <h5 className="fw-semibold">4. Delivery</h5>
            <p className="text-muted">
              On-time delivery and careful unloading at destination.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="section-soft-bg">
        <div className="container-centered py-5">
          <h3 className="fw-semibold mb-3">Why Customers Trust Us</h3>

          <ul className="text-muted trust-list">
            <li>✔ Insurance-protected shipments</li>
            <li>✔ Professionally trained staff</li>
            <li>✔ Live order tracking</li>
            <li>✔ Dedicated customer support</li>
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-centered py-5 text-center">
        <h3 className="fw-semibold mb-2">
          Ready to Move with Confidence?
        </h3>

        <p className="text-muted mb-4">
          Explore our packages and start your move today.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <a href="/packages" className="btn btn-primary">
            View Packages
          </a>
          <a href="/register" className="btn btn-outline-primary">
            Get Started
          </a>
        </div>
      </section>
    </>
  );
}
