import { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layout/DashboardLayout';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [sendingId, setSendingId] = useState(null);

  const loadMessages = async () => {
    const res = await api.get('/admin/messages');
    setMessages(res.data || []);
  };

  const markRead = async (id) => {
    await api.put(`/admin/messages/${id}/read`);
    loadMessages();
  };

  const deleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await api.delete(`/admin/messages/${id}`);
    loadMessages();
  };

  const sendReply = async (id) => {
    try {
      setSendingId(id);

      await api.post(`/admin/messages/${id}/reply`, {
        replyMessage: replyText[id]
      });

      setReplyText(prev => ({ ...prev, [id]: '' }));
      loadMessages();
    } catch (err) {
      console.error(err);
      alert('Failed to send reply');
    } finally {
      setSendingId(null);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Contact Messages</h2>
        </div>

        {messages.length === 0 && (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">
              No messages found.
            </p>
          </div>
        )}

        {/* MESSAGE LIST */}
        {messages.length > 0 && (
          <div className="dashboard-section">
            {messages.map(m => (
              <div
                key={m._id}
                className={`saas-card ${m.status === 'NEW' ? 'highlight-new' : ''}`}
              >

                <div className="message-header">
                  <div>
                    <strong>{m.name}</strong> ({m.email})
                  </div>

                  <span className="status-badge">
                    {m.status}
                  </span>
                </div>

                <p className="mt-2">{m.message}</p>

                {/* ADMIN REPLY */}
                {m.reply?.message && (
                  <div className="reply-box mt-3">
                    <strong>Admin Reply:</strong>
                    <div>{m.reply.message}</div>
                    <small className="text-muted">
                      {new Date(m.reply.repliedAt).toLocaleString()}
                    </small>
                  </div>
                )}

                {/* REPLY INPUT */}
                <textarea
                  className="form-control mt-3"
                  rows="2"
                  placeholder="Write reply..."
                  value={replyText[m._id] || ''}
                  onChange={e =>
                    setReplyText(prev => ({
                      ...prev,
                      [m._id]: e.target.value
                    }))
                  }
                />

                <div className="message-actions">
                  {m.status === 'NEW' && (
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => markRead(m._id)}
                    >
                      Mark Read
                    </button>
                  )}

                  <button
                    className="btn btn-primary btn-sm"
                    disabled={sendingId === m._id}
                    onClick={() => sendReply(m._id)}
                  >
                    {sendingId === m._id ? 'Sending…' : 'Send Reply'}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteMsg(m._id)}
                  >
                    Delete
                  </button>
                </div>

                <small className="text-muted d-block mt-2">
                  {new Date(m.createdAt).toLocaleString()}
                </small>

              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}