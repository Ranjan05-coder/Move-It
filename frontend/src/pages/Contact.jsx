import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/moveit.png';

export default function Contact() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ================= USER MESSAGES ================= */
  const [myMessages, setMyMessages] = useState([]);
  const [showChats, setShowChats] = useState(false);

  const loadMyMessages = async () => {
    try {
      const res = await api.get('/contact/my');
      setMyMessages(res.data || []);
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };
  /* ================================================= */

  /* AUTO REFRESH WHEN CHAT IS OPEN */
  useEffect(() => {
    if (!showChats || !user) return;

    loadMyMessages();

    const interval = setInterval(() => {
      loadMyMessages();
    }, 10000);

    return () => clearInterval(interval);
  }, [showChats, user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleViewPrevious = () => {
    setShowChats(true);
    loadMyMessages();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.message) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      await api.post('/contact', {
        name: form.name,
        email: form.email,
        message: form.message
      });

      // If logged in, auto open chat
      if (user) {
        setShowChats(true);
        loadMyMessages();
      }

      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });

    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-neutral-950 min-h-screen">
      {/* Light mode: Red/Orange + Blue theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-950 pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-error-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">Contact Us</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
            Have questions? Our team is here to help you move with confidence.
          </p>
        </div>

      {/* MAIN CONTENT */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT — CONTACT FORM */}
          <div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card p-6">
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-3">Send Us a Message</h5>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Fill out the form and our support team will respond within 24 hours.
              </p>

              {!submitted && (
                <form onSubmit={handleSubmit}>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Tell us how we can help you…"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>

                </form>
              )}

              {/* View Previous Messages — only for logged-in users */}
              {user && !showChats && (
                <button
                  className="w-full border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-semibold py-2 rounded-lg transition-colors mt-3"
                  onClick={handleViewPrevious}
                >
                  View Previous Messages
                </button>
              )}
            </div>

            {/* USER CHAT */}
            {user && showChats && myMessages.length > 0 && (
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card p-6 mt-6">
                <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-4">Your Messages</h5>

                {myMessages.map(m => (
                  <div key={m._id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 mb-3">
                    <p className="mb-2">
                      <strong className="text-neutral-900 dark:text-white">You:</strong> <span className="text-neutral-700 dark:text-neutral-300">{m.message}</span>
                    </p>

                    <small className="text-neutral-500 dark:text-neutral-400">
                      {new Date(m.createdAt).toLocaleString()}
                    </small>

                    {m.reply && (
                      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 mt-3 p-3 rounded-lg">
                        <strong className="text-blue-900 dark:text-blue-400">Admin Reply:</strong><br />
                        <span className="text-blue-800 dark:text-blue-300">{m.reply.message}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — SUPPORT DETAILS */}
          <div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card p-6">
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-4">Customer Support</h5>

              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Prefer direct contact? Reach us through the details below.
              </p>

              <div className="mb-6">
                <strong className="text-neutral-900 dark:text-white">📧 Email</strong>
                <p className="mb-0 mt-2">
                  <a href="mailto:p5123ranjan@gmail.com" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    p5123ranjan@gmail.com
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <strong className="text-neutral-900 dark:text-white">📞 Phone</strong>
                <p className="mb-0 mt-2">
                  <a href="tel:9973305771" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    +91 9973305771
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <strong className="text-neutral-900 dark:text-white">📍 Office Address</strong>
                <p className="mb-0 mt-2 text-neutral-600 dark:text-neutral-400">
                  Patna, Bihar, India
                </p>
              </div>

              <div>
                <strong className="text-neutral-900 dark:text-white">🕒 Working Hours</strong>
                <p className="mb-0 mt-2 text-neutral-600 dark:text-neutral-400">
                  Mon – Sat: 9:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      </section>

      {/* MAP */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card overflow-hidden">
            <iframe
              title="office-map"
              src="https://www.google.com/maps?q=Patna,Bihar&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* LOGO AT BOTTOM */}
      <section className="py-12 text-center relative">
        <div className="mb-4">
          <div className="inline-block bg-white/90 dark:bg-neutral-900/90 p-4 rounded-2xl backdrop-blur-md">
            <img src={logo} alt="Move It" className="h-20 w-auto" />
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">© 2024 MoveIt - Your Trusted Moving Partner</p>
      </section>

      </div>
    </div>
  );
}