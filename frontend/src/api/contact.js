import api from './axios';

export const fetchContactMessages = async () => {
  const res = await api.get('/contact');
  return res.data;
};

export const markMessageRead = async (id) => {
  await api.put(`/contact/${id}/read`);
};
