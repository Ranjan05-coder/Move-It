export default function Services() {
  return (
    <div className="page-textured-bg">

      {/* ================= PAGE HEADER ================= */}
      <section className="page-header text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">Our Services</h1>
          <p className="text-muted mt-2">
            Reliable moving solutions designed for every need.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="container-centered py-5">
        <div className="row g-4">

          {/* HOME RELOCATION */}
          <div className="col-md-4">
            <div className="card elevated-card h-100 text-center">
              <div className="card-body">
                <div className="mb-3 service-icon">🏠</div>

                <h5 className="fw-semibold">Home Relocation</h5>

                <p className="text-muted mt-2">
                  Safe and secure moving for homes and apartments with trained
                  professionals handling packing, transport, and delivery.
                </p>
              </div>

              <div className="card-footer bg-transparent border-0">
                <a href="/packages" className="btn btn-outline-primary w-100">
                  View Packages
                </a>
              </div>
            </div>
          </div>

          {/* OFFICE RELOCATION */}
          <div className="col-md-4">
            <div className="card elevated-card h-100 text-center">
              <div className="card-body">
                <div className="mb-3 service-icon">🏢</div>

                <h5 className="fw-semibold">Office Relocation</h5>

                <p className="text-muted mt-2">
                  Fast and organized office shifting with minimal downtime,
                  ideal for startups, SMEs, and corporate moves.
                </p>
              </div>

              <div className="card-footer bg-transparent border-0">
                <a href="/packages" className="btn btn-outline-primary w-100">
                  View Packages
                </a>
              </div>
            </div>
          </div>

          {/* STUDENT / BACHELORS */}
          <div className="col-md-4">
            <div className="card elevated-card h-100 text-center">
              <div className="card-body">
                <div className="mb-3 service-icon">🎓</div>

                <h5 className="fw-semibold">Student & Bachelors Moving</h5>

                <p className="text-muted mt-2">
                  Budget-friendly and flexible moving services tailored for
                  students and individuals with limited belongings.
                </p>
              </div>

              <div className="card-footer bg-transparent border-0">
                <a href="/packages" className="btn btn-outline-primary w-100">
                  View Packages
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="py-5">
        <div className="container-centered text-center">
          <h4 className="fw-semibold mb-3">
            Why Choose MoveIt?
          </h4>

          <div className="row g-4 mt-3">
            <div className="col-md-3">
              <p className="fw-semibold mb-1">✔ Trained Staff</p>
              <p className="text-muted small">
                Experienced professionals handle your goods.
              </p>
            </div>

            <div className="col-md-3">
              <p className="fw-semibold mb-1">✔ Secure Transport</p>
              <p className="text-muted small">
                Well-maintained vehicles with safety checks.
              </p>
            </div>

            <div className="col-md-3">
              <p className="fw-semibold mb-1">✔ Real-time Updates</p>
              <p className="text-muted small">
                Track your order status at every stage.
              </p>
            </div>

            <div className="col-md-3">
              <p className="fw-semibold mb-1">✔ Transparent Pricing</p>
              <p className="text-muted small">
                No hidden charges or last-minute surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-centered py-5 text-center">
        <h3 className="fw-semibold mb-2">
          Find the Right Move for You
        </h3>

        <p className="text-muted mb-4">
          Compare packages and book your move in minutes.
        </p>

        <a href="/packages" className="btn btn-primary btn-lg">
          Explore Packages
        </a>
      </section>

    </div>
  );
}
