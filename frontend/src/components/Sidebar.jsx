import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/moveit.png";

export default function Sidebar({ onNavClick }) {
  const { user, logout } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  const handleLogout = () => {
    onNavClick();
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="MoveIt Logo" />
      </div>

      <nav className="sidebar-links">

        {/* ADMIN */}
        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/" end onClick={onNavClick}>
              Home
            </NavLink>
            <NavLink to="/admin" className={linkClass} onClick={onNavClick}>
              Dashboard
            </NavLink>

            <NavLink to="/admin/messages" className={linkClass} onClick={onNavClick}>
              Messages
            </NavLink>

            <NavLink to="/admin/packages" className={linkClass} onClick={onNavClick}>
              Packages
            </NavLink>

            <NavLink to="/admin/users" className={linkClass} onClick={onNavClick}>
              Users
            </NavLink>

            <NavLink to="/admin/crew" className={linkClass} onClick={onNavClick}>
              Crew
            </NavLink>

            <button onClick={handleLogout} className="sidebar-logout-btn">
              🚪 Logout
            </button>
          </>
        )}

        {/* USER */}
        {user?.role === "USER" && (
          <>
            <NavLink to="/" end onClick={onNavClick}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={linkClass} onClick={onNavClick}>
              Dashboard
            </NavLink>

            <NavLink to="/my-orders" className={linkClass} onClick={onNavClick}>
              My Orders
            </NavLink>

            <NavLink to="/packages" className={linkClass} onClick={onNavClick}>
              Book
            </NavLink>

            <button onClick={handleLogout} className="sidebar-logout-btn">
              🚪 Logout
            </button>
          </>
        )}

        {/* TEAM */}
        {user?.role === "TEAM" && (
          <>
            <NavLink to="/team" className={linkClass} onClick={onNavClick}>
              Dashboard
            </NavLink>

            <button onClick={handleLogout} className="sidebar-logout-btn">
              🚪 Logout
            </button>
          </>
        )}

      </nav>
    </aside>
  );
}