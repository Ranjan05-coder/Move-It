import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layout/DashboardLayout';

export default function AdminCrew() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCrew, setShowCreateCrew] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', role: 'Helper' });
  const [creating, setCreating] = useState(false);

  const loadTeams = async () => {
    try {
      const res = await api.get('/admin/teams');
      setTeams(res.data || []);
      if (res.data && res.data.length > 0) {
        setSelectedTeam(res.data[0]._id);
      }
    } catch (err) {
      console.error('Load teams error:', err);
    }
  };

  const loadCrew = async (teamId) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/crew/${teamId}`);
      setCrew(res.data || []);
    } catch (err) {
      console.error('Load crew error:', err);
      setCrew([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      loadCrew(selectedTeam);
    }
  }, [selectedTeam]);

  const handleCreateCrew = async () => {
    if (!formData.name || !selectedTeam) {
      return alert('Team and name required');
    }
    try {
      setCreating(true);
      await api.post('/admin/crew', {
        team: selectedTeam,
        ...formData
      });
      setFormData({ name: '', phone: '', email: '', role: 'Helper' });
      setShowCreateCrew(false);
      loadCrew(selectedTeam);
      alert('Crew member added');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create crew member');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCrew = async (crewId) => {
    if (!window.confirm('Delete this crew member?')) return;
    try {
      await api.delete(`/admin/crew/${crewId}`);
      loadCrew(selectedTeam);
      alert('Crew member deleted');
    } catch (err) {
      alert('Failed to delete crew member');
    }
  };

  const handleToggleActive = async (crewId, currentStatus) => {
    try {
      const crewMember = crew.find(c => c._id === crewId);
      await api.put(`/admin/crew/${crewId}`, {
        ...crewMember,
        isActive: !currentStatus
      });
      loadCrew(selectedTeam);
    } catch (err) {
      alert('Failed to update crew member');
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h2 className="mb-1">Crew Management</h2>
            <p className="text-muted small mb-0">Manage team crew members</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setShowCreateCrew(true); setFormData({ name: '', phone: '', email: '', role: 'Helper' }); }}
            disabled={!selectedTeam}
          >
            + Add Crew Member
          </button>
        </div>

        {/* TEAM SELECTOR */}
        <div className="dashboard-section">
          <label className="form-label">Select Team:</label>
          <select
            className="form-select"
            value={selectedTeam || ''}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">-- Choose a team --</option>
            {teams.map(team => (
              <option key={team._id} value={team._id}>
                {team.name} ({team.email})
              </option>
            ))}
          </select>
        </div>

        {/* CONTENT */}
        {!selectedTeam ? (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">Please select a team first</p>
          </div>
        ) : loading ? (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">Loading crew...</p>
          </div>
        ) : crew.length === 0 ? (
          <div className="saas-card text-center">
            <p className="text-muted mb-0">No crew members found</p>
          </div>
        ) : (
          <div className="dashboard-section">
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-hover" style={{ minWidth: '800px' }}>
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Completed</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {crew.map(member => (
                    <tr key={member._id}>
                      <td><strong>{member.name}</strong></td>
                      <td><small>{member.phone || 'N/A'}</small></td>
                      <td><small>{member.email || 'N/A'}</small></td>
                      <td><small>{member.role}</small></td>
                      <td>
                        <span className={`badge ${member.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <small>{member.assignedOrders}</small>
                      </td>
                      <td>
                        <small>{member.completedOrders}</small>
                      </td>
                      <td>
                        <small>⭐ {member.rating.toFixed(1)}</small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className={`btn btn-outline-${member.isActive ? 'danger' : 'success'}`}
                            onClick={() => handleToggleActive(member._id, member.isActive)}
                            title={member.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {member.isActive ? '🔒' : '🔓'}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteCrew(member._id)}
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

        {/* CREATE CREW MODAL */}
        {showCreateCrew && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h4>Add Crew Member</h4>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Crew member name"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone number"
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
                <label>Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Driver, Helper"
                />
              </div>
              <div className="form-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCreateCrew(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleCreateCrew}
                  disabled={creating}
                >
                  {creating ? 'Adding...' : 'Add Crew'}
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
          .form-group input, .form-group select {
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
          .form-select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
}
