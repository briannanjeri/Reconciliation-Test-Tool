import React from 'react';

export const StatusTag = ({ status }) => {
  const statusConfig = {
    matched: { text: 'Matched', className: 'status-matched' },
    discrepancy: { text: 'Amount Discrepancy', className: 'status-discrepancy' },
    items_discrepancy: { text: 'Items Discrepancy', className: 'status-discrepancy' },
    missing_in_provider: { text: 'Missing in Provider', className: 'status-missing' },
    missing_in_internal: { text: 'Missing in Internal', className: 'status-missing' }
  };
  
  const config = statusConfig[status] || { text: status, className: 'status-matched' };
  return <span className={`status-tag ${config.className}`}>{config.text}</span>;
};