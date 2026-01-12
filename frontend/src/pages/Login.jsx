import { useState } from 'react';
import api from '../api/axios';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // ✅ FIXED: handleChange DEFINED
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
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/auth/login', form);

      // ✅ STORE AUTH DATA
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      window.location.href = '/';

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-textured-bg">
      <AuthLayout
        title="Welcome Back"
        subtitle="Login to manage your moves and orders"
      >
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-2">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                className="form-control"
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger mt-3 py-2">
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            className="btn btn-primary w-100 mt-4"
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          {/* FOOTER */}
          <div className="text-center mt-4">
            <p className="text-muted mb-1">Don’t have an account?</p>
            <a href="/register" className="fw-semibold">
              Create an account
            </a>
          </div>

        </form>
      </AuthLayout>
    </div>
  );
}
