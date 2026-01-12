import React from 'react';
import api from '../../api/axios';

export default function OrderRow({ order, onActionComplete }) {
  const assignTeam = async () => {
    const teamId = prompt('Enter TEAM MongoDB _id (not email)');
    if (!teamId) return;

    try {
      await api.put(`/orders/${order._id}/assign`, { teamId });
      onActionComplete();
    } catch (err) {
      console.error(err);
      alert('Failed to assign team');
    }
  };

  const completeOrder = async () => {
    try {
      await api.put(`/orders/${order._id}/confirm-complete`);
      onActionComplete();
    } catch (err) {
      console.error(err);
      alert('Failed to complete order');
    }
  };

  const statusColor = {
    PLACED: 'secondary',
    PAID: 'success',
    ASSIGNED: 'primary',
    DEPARTED: 'warning',
    ARRIVED: 'info',
    COMPLETED: 'dark'
  }[order.status] || 'secondary';

  return (
    <tr>
      <td>{order._id.slice(-6)}</td>
      <td>{order.customer?.email || '-'}</td>
      <td>{order.package?.name || '-'}</td>

      <td>
        <span className={`badge bg-${statusColor}`}>
          {order.status}
        </span>
      </td>

      <td>{order.assignedTeam?.email || '-'}</td>

      <td>
        {/* ADMIN ACTIONS */}

        {order.status === 'PAID' && (
          <button
            className="btn btn-sm btn-primary"
            onClick={assignTeam}
          >
            Assign Team
          </button>
        )}

        {order.status === 'ARRIVED' && order.feedback && (
          <button
            className="btn btn-sm btn-success"
            onClick={completeOrder}
          >
            Complete Order
          </button>
        )}
      </td>
    </tr>
  );
}
