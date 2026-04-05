import { useState } from 'react';
import api from '../api/axios';
import logo from '../assets/moveit.png';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      console.log('🔐 Attempting login with:', form.email);

      const res = await api.post('/auth/login', form);

      console.log('✅ Login successful:', res.data);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Role-based redirect
      const redirectUrl = 
        res.data.user.role === 'ADMIN' ? '/admin' :
        res.data.user.role === 'TEAM' ? '/team' :
        '/';

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 500);
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      const message = err.response?.data?.message || 'Invalid email or password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 flex items-center justify-center px-4 py-12 relative">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* TITLE AT TOP */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Welcome Back</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Login to manage your moves and orders</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-8 border border-neutral-100 dark:border-neutral-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Email Address</label>
              <input
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Password</label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-12"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed duration-200"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* DIVIDER */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">or</span>
              </div>
            </div>

            {/* REGISTER LINK */}
            <div className="text-center">
              <p className="text-neutral-600 dark:text-neutral-400">Don't have an account?</p>
              <a href="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors mt-1 inline-block">
                Create an account →
              </a>
            </div>
          </form>
        </div>

        {/* LOGO AT BOTTOM */}
        <div className="text-center mt-8">
          <div className="inline-block bg-white/90 dark:bg-neutral-900/90 p-3 rounded-2xl backdrop-blur-md mb-3">
            <img src={logo} alt="Move It" className="h-12 w-auto" />
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            © 2024 MoveIt. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
