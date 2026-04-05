import React, { useEffect, useState } from 'react';
import {
  fetchNotifications,
  deleteNotification // 🔥 NEW
} from '../../api/notification';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchNotifications();
      setNotifications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      // 🔥 DELETE notification instead of mark read
      await deleteNotification(id);
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card elevated-card mb-4">
      <div className="card-body">
        <h5 className="fw-semibold mb-3">🔔 Notifications</h5>

        {loading && <p>Loading…</p>}

        {!loading && notifications.length === 0 && (
          <p className="text-muted">No notifications</p>
        )}

        {notifications.map(n => (
          <div key={n._id} className="mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <span>{n.message}</span>

              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => handleRead(n._id)}
              >
                Read
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
