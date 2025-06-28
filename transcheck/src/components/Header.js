import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">Transaction Reconciliation</h1>
        <p className="header-subtitle">Upload your CSV files to compare transactions</p>
      </div>
    </div>
  );
};

export default Header;