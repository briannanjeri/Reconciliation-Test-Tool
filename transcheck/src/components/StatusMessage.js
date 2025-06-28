import React from 'react';
import '../styles/StatusMessage.css';

const StatusMessage = ({ type, icon, message }) => {
  return (
    <div className={`status-message status-${type}`}>
      {icon}
      {message}
    </div>
  );
};

export default StatusMessage;