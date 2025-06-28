import React from 'react';
import { StatusTag } from '../components/StatusTag';
import { AmountDifference } from '../components/AmountDifference';

export const getTableColumns = () => [
  {
    title: 'Transaction ID',
    dataIndex: 'transaction_id',
    key: 'transaction_id',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Internal Items',
    dataIndex: 'items_sold',
    key: 'internal_items',
    width: 120,
    render: (value) => value !== null ? value : '-',
  },
  {
    title: 'Provider Items',
    dataIndex: 'provider_items',
    key: 'provider_items',
    width: 120,
    render: (value) => value !== null ? value : '-',
  },
  {
    title: 'Items Diff',
    dataIndex: 'items_difference',
    key: 'items_difference',
    width: 100,
    render: (diff) => (
      <span style={{ 
        color: Math.abs(diff) === 0 ? 'var(--success-color)' : 'var(--error-color)',
        fontWeight: 600 
      }}>
        {diff > 0 ? '+' : ''}{diff}
      </span>
    ),
  },
  {
    title: 'Internal Amount',
    dataIndex: 'amount',
    key: 'internal_amount',
    width: 130,
    render: (amount) => amount !== null ? `$${amount.toFixed(2)}` : '-',
  },
  {
    title: 'Provider Amount',
    dataIndex: 'provider_amount',
    key: 'provider_amount',
    width: 130,
    render: (amount) => amount !== null ? `$${amount.toFixed(2)}` : '-',
  },
  {
    title: 'Amount Diff',
    dataIndex: 'amount_difference',
    key: 'amount_difference',
    width: 120,
    render: (diff) => <AmountDifference difference={diff} />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 180,
    render: (status) => <StatusTag status={status} />,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 120,
  },
];