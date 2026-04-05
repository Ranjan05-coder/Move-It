import api from './axios';

/* GET ALL */
export const fetchNotifications = async () => {
  const res = await api.get('/notifications');
  return res.data;
};

/* MARK READ (if still used somewhere) */
export const markNotificationRead = async (id) => {
  const res = await api.put(`/notifications/${id}/read`);
  return res.data;
};

/* ✅ DELETE NOTIFICATION */
export const deleteNotification = async (id) => {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
};
