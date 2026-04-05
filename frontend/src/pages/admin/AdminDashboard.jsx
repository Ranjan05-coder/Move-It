import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import NotificationPanel from '../../components/admin/NotificationPanel';
import OrderRow from '../../components/admin/OrderRow';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      setOrders(res.data || []);
      setError('');
    } catch (err) {
      console.error('ADMIN LOAD ORDERS ERROR:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  /* ======================
     FILTER LOGIC
  ====================== */

  const filteredOrders = orders.filter(order => {
    // Status filter
    if (filterStatus && order.status !== filterStatus) {
      return false;
    }

    // Date range filter
    if (filterDateFrom) {
      const orderDate = new Date(order.createdAt);
      const fromDate = new Date(filterDateFrom);
      if (orderDate < fromDate) return false;
    }

    if (filterDateTo) {
      const orderDate = new Date(order.createdAt);
      const toDate = new Date(filterDateTo);
      toDate.setHours(23, 59, 59, 999); // Include entire day
      if (orderDate > toDate) return false;
    }

    // Search filter (customer email or order ID)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesEmail = order.customer?.email?.toLowerCase().includes(query);
      const matchesOrderId = order._id?.toLowerCase().includes(query);
      if (!matchesEmail && !matchesOrderId) return false;
    }

    return true;
  });

  /* ======================
     ENTERPRISE METRICS
  ====================== */

  const totalOrders = orders.length;

  const paidOrders = orders.filter(o => o.status === 'PAID').length;

  const completedOrders = orders.filter(
    o => o.status === 'COMPLETED'
  ).length;

  const pendingOrders = orders.filter(
    o => !['COMPLETED'].includes(o.status)
  ).length;

  const totalRevenue = orders
    .filter(o => o.status === 'COMPLETED')
    .reduce((sum, o) => sum + (o.package?.price || 0), 0);

  // Clear filters
  const clearFilters = () => {
    setFilterStatus('');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSearchQuery('');
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer Email', 'Package', 'Status', 'Total', 'Team', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(o =>
        [
          o._id,
          o.customer?.email || 'N/A',
          o.package?.name || 'N/A',
          o.status,
          o.package?.price || 0,
          o.assignedTeam?.name || 'Unassigned',
          new Date(o.createdAt).toLocaleDateString()
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h2 className="mb-1">Admin Dashboard</h2>
            <p className="text-muted small mb-0">
              Operational overview & order management
            </p>
          </div>

          <div className="dashboard-actions">
            <Link to="/admin/packages" className="btn btn-outline-secondary">
              Manage Packages
            </Link>

            <Link to="/admin/users" className="btn btn-outline-secondary">
              Manage Users
            </Link>

            <Link to="/admin/crew" className="btn btn-outline-secondary">
              Manage Crew
            </Link>

            <Link to="/admin/messages" className="btn btn-outline-secondary">
              View Messages
            </Link>
          </div>
        </div>

        {/* KPI ROW */}
        <div className="dashboard-metrics">

          <div className="metric-card primary">
            <div className="metric-label">Total Orders</div>
            <div className="metric-value">{totalOrders}</div>
          </div>

          <div className="metric-card success">
            <div className="metric-label">Revenue</div>
            <div className="metric-value">₹{totalRevenue}</div>
          </div>

          <div className="metric-card warning">
            <div className="metric-label">Pending</div>
            <div className="metric-value">{pendingOrders}</div>
          </div>

          <div className="metric-card completed">
            <div className="metric-label">Completed</div>
            <div className="metric-value">{completedOrders}</div>
          </div>

        </div>

        {/* NOTIFICATIONS */}
        <div className="dashboard-section">
          <NotificationPanel />
        </div>

        {/* FILTERS & SEARCH */}
        <div className="dashboard-section">
          <div className="section-header">
            <h4 className="section-title">📋 Order Filters</h4>
          </div>

          <div className="filter-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {/* Search */}
            <div>
              <label className="form-label small">🔍 Search (Email/Order ID)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="form-label small">📌 Status</label>
              <select
                className="form-control"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="PLACED">PLACED</option>
                <option value="PAID">PAID</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="DEPARTED">DEPARTED</option>
                <option value="ARRIVED">ARRIVED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="form-label small">📅 From Date</label>
              <input
                type="date"
                className="form-control"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div>
              <label className="form-label small">📅 To Date</label>
              <input
                type="date"
                className="form-control"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={clearFilters}
            >
              🔄 Clear Filters
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={exportToCSV}
              disabled={filteredOrders.length === 0}
            >
              📥 Export to CSV
            </button>
          </div>

          {/* Results Info */}
          <div className="alert alert-info small mb-3">
            Showing <strong>{filteredOrders.length}</strong> of <strong>{totalOrders}</strong> orders
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="dashboard-section">
          <div className="section-header">
            <h4 className="section-title">All Orders</h4>
          </div>

          {loading && <p className="text-muted">Loading orders...</p>}

          {!loading && error && (
            <p className="text-danger">{error}</p>
          )}

          {!loading && !error && filteredOrders.length === 0 && (
            <p className="text-muted">
              {orders.length === 0 ? 'No orders found.' : 'No orders match your filters.'}
            </p>
          )}

          {!loading && filteredOrders.length > 0 && (
            <div className="saas-card">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>User</th>
                      <th>Package</th>
                      <th>Status</th>
                      <th>Team</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <OrderRow
                        key={order._id}
                        order={order}
                        onActionComplete={loadOrders}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}