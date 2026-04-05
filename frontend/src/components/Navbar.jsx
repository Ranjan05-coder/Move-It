import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/moveit.png';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout, supportUnread } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-2xl border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95">
            <img src={logo} alt="Move It" className="h-16 w-auto font-bold drop-shadow-lg" />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-all relative pb-2 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                  isActive ? 'after:w-full' : ''
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `text-sm font-medium transition-all relative pb-2 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                  isActive ? 'after:w-full' : ''
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-all relative pb-2 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                  isActive ? 'after:w-full' : ''
                }`
              }
            >
              About
            </NavLink>

            {!user && (
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium transition-all relative pb-2 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                    isActive ? 'after:w-full' : ''
                  }`
                }
              >
                Contact
              </NavLink>
            )}

            {user && (
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `text-sm font-medium transition-all relative pb-2 flex items-center gap-1 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                    isActive ? 'after:w-full' : ''
                  }`
                }
              >
                Support
                {supportUnread > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    {supportUnread}
                  </span>
                )}
              </NavLink>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <div className="hidden md:block">
                <NotificationBell />
              </div>
            )}

            {!user && (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {user && (
              <div className="hidden md:flex items-center gap-2">
                {user.role === 'ADMIN' && (
                  <NavLink
                    to="/admin"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Admin
                  </NavLink>
                )}

                {user.role === 'TEAM' && (
                  <NavLink
                    to="/team"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Team
                  </NavLink>
                )}

                {/* PROFILE DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold text-sm hover:shadow-lg transition-shadow"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md dark:backdrop-blur-sm rounded-lg shadow-2xl border border-white/40 dark:border-neutral-700/50 py-2 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        👤 Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        📊 Dashboard
                      </Link>
                      <Link
                        to="/my-orders"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        📦 My Orders
                      </Link>
                      <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* THEME TOGGLE */}
            <button
              onClick={() => {
                console.log('Theme toggle clicked - switching to', theme === 'light' ? 'DARK' : 'LIGHT');
                toggleTheme();
              }}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-lg"
              title="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 space-y-3">
          <NavLink
            to="/"
            className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Services
          </NavLink>

          <NavLink
            to="/about"
            className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            About
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/contact"
                className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </NavLink>

              <hr className="my-2 border-neutral-200 dark:border-neutral-700" />

              <NavLink
                to="/login"
                className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block w-full btn btn-primary btn-sm text-center"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/support"
                className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Support {supportUnread > 0 && `(${supportUnread})`}
              </NavLink>

              <hr className="my-2 border-neutral-200 dark:border-neutral-700" />

              <NavLink
                to="/profile"
                className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </NavLink>

              <NavLink
                to="/dashboard"
                className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-orders"
                className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                My Orders
              </NavLink>

              {user.role === 'ADMIN' && (
                <NavLink
                  to="/admin"
                  className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </NavLink>
              )}

              {user.role === 'TEAM' && (
                <NavLink
                  to="/team"
                  className="block px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Team Dashboard
                </NavLink>
              )}

              <hr className="my-2 border-neutral-200 dark:border-neutral-700" />

              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}