import { useState } from 'react';
import api from '../api/axios';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = pwd =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /\d/.test(pwd);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!validatePassword(form.password)) {
      return setError(
        'Password must be 8+ characters, include 1 uppercase letter and 1 number'
      );
    }

    if (form.password !== form.confirm) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await api.post('/auth/register', form);
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-textured-bg">
      <AuthLayout title="Create your MoveIt account">
        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          {error && (
            <small className="text-danger d-block mt-1">
              {error}
            </small>
          )}

          <button
            className="btn btn-success w-100 mt-3"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </AuthLayout>
    </div>
  );
}
