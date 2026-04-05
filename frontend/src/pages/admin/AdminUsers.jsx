import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layout/DashboardLayout';
import { Link } from 'react-router-dom';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Load users error:', err);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateAdmin = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      return alert('All fields required');
    }
    try {
      setCreating(true);
      await api.post('/admin/users/create-admin', formData);
      setFormData({ name: '', email: '', password: '' });
      setShowCreateAdmin(false);
      loadUsers();
      alert('Admin user created successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create admin');
    } finally {
      setCreating(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      return alert('All fields required');
    }
    try {
      setCreating(true);
      await api.post('/admin/users/create-team', formData);
      setFormData({ name: '', email: '', password: '' });
      setShowCreateTeam(false);
      loadUsers();
      alert('Team user created successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create team');
    } finally {
      setCreating(false);
    }
  };

  const handleToggleActive = async (userId, isCurrentActive) => {
    if (!window.confirm(isCurrentActive ? 'Deactivate this user?' : 'Activate this user?')) return;
    try {
      await api.put(`/admin/users/${userId}/toggle-active`);
      loadUsers();
    } catch (err) {
      alert('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      loadUsers();
      alert('User deleted');
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      loadUsers();
    } catch (err) {
      alert('Failed to change role');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userCounts = {
    total: users.length,
    admin: users.filter(u => u.role === 'ADMIN').length,
    team: users.filter(u => u.role === 'TEAM').length,
    regular: users.filter(u => u.role === 'USER').length
  };

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h2 className="mb-1">User Management</h2>
            <p className="text-muted small mb-0">Create, edit, and manage all users</p>
          </div>
          <div className="dashboard-actions gap-2">
            <button
              className="btn btn-success"
              onClick={() => { setShowCreateAdmin(true); setFormData({ name: '', email: '', password: '' }); }}
            >
              + Create Admin
            </button>
            <button
              className="btn btn-primary"
              onClick={() => { setShowCreateTeam(true); setFormData({ name: '', email: '', password: '' }); }}
            >
              + Create Team
            </button>
          </div>
        </div>

        {/* USER STATS */}
        <div className="dashboard-metrics">
          <div className="metric-card primary">
            <div className="metric-label">Total Users</div>
            <div className="metric-value">{userCounts.total}</div>
          </div>
          <div className="metric-card success">
            <div className="metric-label">Admins</div>
            <div className="metric-value">{userCounts.admin}</div>
          </div>
          <div className="metric-card warning">
            <div className="metric-label">Team Members</div>
            <div className="metric-value">{userCounts.team}</div>
          </div>
          <div className="metric-card info">
            <div className="metric-label">Regular Users</div>
            <div className="metric-value">{userCounts.regular}</div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="dashboard-section">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">Loading users...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredUsers.length === 0 && (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">No users found</p>
          </div>
        )}

        {/* USER LIST */}
        {!loading && filteredUsers.length > 0 && (
          <div className="dashboard-section">
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-hover" style={{ minWidth: '800px' }}>
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td>
                        <strong>{user.name}</strong>
                      </td>
                      <td>
                        <small>{user.email}</small>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={user.role}
                          onChange={(e) => handleChangeRole(user._id, e.target.value)}
                          style={{ width: '120px' }}
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="TEAM">TEAM</option>
                        </select>
                      </td>
                      <td>
                        <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <small>{new Date(user.createdAt).toLocaleDateString()}</small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className={`btn btn-outline-${user.isActive ? 'danger' : 'success'}`}
                            onClick={() => handleToggleActive(user._id, user.isActive)}
                            title={user.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {user.isActive ? '🔒' : '🔓'}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CREATE ADMIN MODAL */}
        {showCreateAdmin && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h4>Create Admin User</h4>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password (8+ chars, 1 uppercase, 1 number)"
                />
              </div>
              <div className="form-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCreateAdmin(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleCreateAdmin}
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CREATE TEAM MODAL */}
        {showCreateTeam && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h4>Create Team User</h4>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password (8+ chars, 1 uppercase, 1 number)"
                />
              </div>
              <div className="form-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCreateTeam(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleCreateTeam}
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create Team'}
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .modal-box {
            background: white;
            border-radius: 12px;
            padding: 24px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }
          .modal-box h4 {
            margin-bottom: 20px;
            font-weight: 600;
          }
          .form-group {
            margin-bottom: 16px;
          }
          .form-group label {
            display: block;
            font-weight: 500;
            margin-bottom: 6px;
            font-size: 14px;
          }
          .form-group input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
          }
          .form-actions {
            display: flex;
            gap: 8px;
            margin-top: 24px;
            justify-content: flex-end;
          }
          .form-actions button {
            padding: 8px 16px;
            font-size: 14px;
          }
          .btn-group {
            display: flex;
            gap: 4px;
          }
          .btn-group-sm .btn {
            padding: 4px 8px;
            font-size: 12px;
          }
          .table-light {
            background-color: #f8f9fa;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
}
