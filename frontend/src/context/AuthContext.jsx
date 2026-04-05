import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  // 🔴 NEW — Unread support replies
  const [supportUnread, setSupportUnread] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    setUser(user);

    return user;
  };

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload);
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    setUser(user);

    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setSupportUnread(0); // 🔥 reset unread on logout

    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        supportUnread,     // 🔴 exposed
        setSupportUnread   // 🔴 exposed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};