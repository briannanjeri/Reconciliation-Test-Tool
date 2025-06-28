import React from 'react';
import { Statistic } from 'antd';

export const StatisticCard = ({ title, value, icon, type, loading = false }) => {
  return (
    <div className={`stat-card`}>
      <div className={`stat-icon ${type}`}>
        {icon}
      </div>
      <Statistic 
        title={title} 
        value={value} 
        loading={loading}
        valueStyle={{ 
          fontSize: '24px', 
          fontWeight: '700',
          color: 'var(--text-primary)'
        }}
      />
    </div>
  );
};