import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { markNotificationRead } from '../api/notification';

export default function NotificationList({ items, onRead, onClose }) {
  const navigate = useNavigate();

  const handleClick = async (n) => {
    try {
      // ✅ avoid duplicate mark-read calls
      if (!n.read) {
        await markNotificationRead(n._id);
        onRead?.(); // refresh bell + list
      }

      if (n.order) {
        navigate(`/orders/${n.order}`);
      }
    } catch (err) {
      console.error('Notification click failed', err);
    } finally {
      // ✅ close dropdown after action (if parent supports it)
      onClose?.();
    }
  };

  return (
    <div className="notification-list">
      {items.length === 0 && (
        <p className="text-muted small text-center mb-0">
          No notifications
        </p>
      )}

      {items.map((n, index) => (
        <motion.div
          key={n._id}
          className={`notification-item ${n.read ? '' : 'unread'}`}
          onClick={() => handleClick(n)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="mb-1 fw-medium">
            {n.message}
          </p>

          <small className="text-muted">
            {n.createdAt
              ? new Date(n.createdAt).toLocaleString()
              : 'Just now'}
          </small>
        </motion.div>
      ))}
    </div>
  );
}
