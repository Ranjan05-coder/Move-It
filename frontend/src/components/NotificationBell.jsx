import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchNotifications } from '../api/notification';
import NotificationList from './NotificationList';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const data = await fetchNotifications();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Notification load failed', e);
      setItems([]);
    }
  };

  /* ================= INITIAL + AUTO REFRESH ================= */
  useEffect(() => {
    load();

    // 🔁 auto refresh every 20s (balanced)
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
  }, []);

  /* ================= REFRESH WHEN DROPDOWN OPENS ================= */
  useEffect(() => {
    if (open) {
      load(); // 🔥 instant refresh when user opens bell
    }
  }, [open]);

  const unreadCount = items.filter(n => !n.read).length;

  return (
    <div className="notification-bell position-relative">
      <motion.button
        className="btn btn-outline-secondary btn-sm position-relative"
        onClick={() => setOpen(prev => !prev)}
        animate={
          unreadCount > 0
            ? { scale: [1, 1.15, 1] } // 🔔 pulse
            : { scale: 1 }
        }
        transition={{ duration: 0.4 }}
      >
        🔔
        {unreadCount > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {open && (
        <div className="notification-dropdown fade-slide">
          <NotificationList
            items={items.slice(0, 5)}
            onRead={load}   // 🔄 refresh after mark-read
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
