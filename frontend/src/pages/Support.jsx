import { useState, useEffect, useContext, useRef } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function SupportContent() {
  const { user, setSupportUnread } = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const [myMessages, setMyMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const loadMyMessages = async () => {
    try {
      const res = await api.get('/contact/my');
      const messages = res.data || [];

      setMyMessages(messages);

      // 🔴 Calculate unread replies (simple logic: admin replied after user message)
      const unreadCount = messages.filter(m =>
        m.reply &&
        (!m.reply.readByUser) // if backend supports this
      ).length;

      setSupportUnread(unreadCount);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMyMessages();

    const interval = setInterval(() => {
      loadMyMessages();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [myMessages]);

  // ✅ When support page opens → reset unread badge
  useEffect(() => {
    setSupportUnread(0);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setLoading(true);

      await api.post('/contact', {
        name: user?.name || 'User',
        email: user?.email,
        message
      });

      setMessage('');
      loadMyMessages();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-textured-bg">

      <section className="page-header text-center">
        <div className="container-centered py-5">
          <h1 className="fw-bold">Support</h1>
          <p className="text-muted mt-2">
            Chat directly with our support team.
          </p>
        </div>
      </section>

      <section className="container-centered py-5">
        <div className="row g-5">

          {/* LEFT — CHAT */}
          <div className="col-md-6">
            <div className="card elevated-card p-4">
              <h5 className="fw-semibold mb-3">Chat with Support</h5>

              <div className="chat-container">
                {myMessages.map(m => (
                  <div key={m._id} className="chat-thread fade-in">

                    <div className="chat-bubble user-bubble">
                      <div>{m.message}</div>
                      <small className="chat-time">
                        {new Date(m.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </div>

                    {m.reply && (
                      <div className="chat-bubble admin-bubble">
                        <div>{m.reply.message}</div>
                        <small className="chat-time">
                          {new Date(m.reply.repliedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                        <div className="chat-seen">Seen</div>
                      </div>
                    )}

                  </div>
                ))}

                <div ref={chatEndRef}></div>
              </div>

              <form onSubmit={handleSubmit} className="mt-3">
                <textarea
                  className="form-control mb-2"
                  rows="3"
                  placeholder="Type your message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>

            </div>
          </div>

          {/* RIGHT — COMPANY DETAILS */}
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

export default function Support() {
  return (
    <ProtectedRoute>
      <SupportContent />
    </ProtectedRoute>
  );
}