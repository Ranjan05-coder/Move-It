import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Failed to load notifications', err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      loadNotifications();
    } catch (err) {
      console.error('Failed to mark notification read', err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="mb-3">Notifications</h5>

        {loading && <p className="text-muted">Loading notifications...</p>}

        {!loading && notifications.length === 0 && (
          <p className="text-muted">No notifications</p>
        )}

        {notifications.map(n => (
          <div
            key={n._id}
            className={`border-bottom py-2 ${
              !n.read ? 'bg-light' : ''
            }`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>
                {!n.read && <strong>• </strong>}
                {n.message}
              </span>

              {!n.read && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => markRead(n._id)}
                >
                  Mark read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
