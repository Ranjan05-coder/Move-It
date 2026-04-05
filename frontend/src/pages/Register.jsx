import { useState } from 'react';
import api from '../api/axios';
import logo from '../assets/moveit.png';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /\d/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!validatePassword(form.password)) {
      setError('Password must be 8+ characters with 1 uppercase letter and 1 number');
      return;
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      console.log('📝 Attempting registration with:', form.email);

      const res = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      console.log('✅ Registration successful:', res.data);

      setSuccessMsg('Account created! Redirecting to login...');
      setTimeout(() => {
        // New users redirect to login for their first time
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 flex items-center justify-center px-4 py-12 relative">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* TITLE AT TOP */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Join MoveIt</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Create your account to start moving</p>
        </div>

        {/* REGISTER CARD */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-8 border border-neutral-100 dark:border-neutral-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Full Name</label>
              <input
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Email Address</label>
              <input
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
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
              <input
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                name="password"
                type="password"
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                value={form.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Must be 8+ characters with 1 uppercase and 1 number</p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 dark:text-white mb-2">Confirm Password</label>
              <input
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {successMsg && (
              <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
                ✓ {successMsg}
              </div>
            )}

            {/* REGISTER BUTTON */}
            <button
              className="w-full bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed duration-200"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
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

            {/* LOGIN LINK */}
            <div className="text-center">
              <p className="text-neutral-600 dark:text-neutral-400">Already have an account?</p>
              <a href="/login" className="text-secondary-600 dark:text-secondary-400 font-semibold hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors mt-1 inline-block">
                Login here →
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
