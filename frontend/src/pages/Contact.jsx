import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert('Please fill all fields');
      return;
    }

    // Later → connect backend / email service
    setSubmitted(true);
  };

  return (
    <div className="page-textured-bg">

      {/* ================= PAGE HEADER ================= */}
      <section className="page-header text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="text-muted mt-2">
            Have questions? Our team is here to help you move with confidence.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="container-centered py-5">
        <div className="row g-5">

          {/* LEFT — CONTACT FORM */}
          <div className="col-md-6">
            <div className="card elevated-card p-4">
              <h5 className="fw-semibold mb-3">Send Us a Message</h5>

              <p className="text-muted small mb-4">
                Fill out the form and our support team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="alert alert-success">
                  ✅ Thank you! We’ve received your message and will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      className="form-control"
                      placeholder="Tell us how we can help you…"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-2"
                  >
                    Send Message
                  </button>

                </form>
              )}
            </div>
          </div>

          {/* RIGHT — SUPPORT DETAILS */}
          <div className="col-md-6">
            <div className="card elevated-card p-4 h-100">
              <h5 className="fw-semibold mb-3">Customer Support</h5>

              <p className="text-muted mb-4">
                Prefer direct contact? Reach us through the details below.
              </p>

              <div className="support-item mb-3">
                <strong>📧 Email</strong>
                <p className="mb-0">
                  <a href="mailto:p5123ranjan@gmail.com">
                    p5123ranjan@gmail.com
                  </a>
                </p>
              </div>

              <div className="support-item mb-3">
                <strong>📞 Phone</strong>
                <p className="mb-0">
                  <a href="tel:9973305771">
                    +91 9973305771
                  </a>
                </p>
              </div>

              <div className="support-item mb-3">
                <strong>📍 Office Address</strong>
                <p className="mb-0">
                  Patna, Bihar, India
                </p>
              </div>

              <div className="support-item">
                <strong>🕒 Working Hours</strong>
                <p className="mb-0">
                  Mon – Sat: 9:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="container-centered pb-5">
        <div className="card elevated-card overflow-hidden">
          <iframe
            title="office-map"
            src="https://www.google.com/maps?q=Patna,Bihar&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </section>

    </div>
  );
}
