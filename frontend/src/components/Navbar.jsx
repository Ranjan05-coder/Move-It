import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/moveit.png';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">

      {/* LEFT — LOGO */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Move It" />
        </Link>
      </div>

      {/* CENTER — NAV LINKS */}
      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      {/* RIGHT — ACTIONS */}
      <div className="navbar-actions">

        {!user && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm">
              Sign up
            </NavLink>
          </>
        )}

        {user && (
          <>
            {/* USER */}
            {user.role === 'USER' && (
              <NavLink to="/my-orders">My Orders</NavLink>
            )}

            {/* ADMIN */}
            {user.role === 'ADMIN' && (
              <NavLink to="/admin" className="btn btn-outline-primary btn-sm">
                Admin
              </NavLink>
            )}

            {/* TEAM */}
            {user.role === 'TEAM' && (
              <NavLink to="/team" className="btn btn-outline-primary btn-sm">
                Team Dashboard
              </NavLink>
            )}

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

      </div>
    </nav>
  );
}