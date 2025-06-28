import React from 'react';

export const ReconciliationStyles = () => (
  <style>{`
    :root {
      --primary-gradient: linear-gradient(135deg, #4f46e5, #7c3aed);
      --success-color: #10b981;
      --error-color: #ef4444;
      --warning-color: #f59e0b;
      --text-primary: #1e293b;
      --text-secondary: #64748b;
      --border-light: #e2e8f0;
      --background-light: #f8fafc;
      --shadow-medium: 0 10px 30px rgba(0, 0, 0, 0.1);
      --border-radius: 16px;
      --transition: all 0.3s ease;
    }

    .reconciliation-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
    }

    .reconciliation-card {
      max-width: 1400px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .reconciliation-header {
      background: var(--primary-gradient);
      color: white;
      padding: 32px;
      position: relative;
      overflow: hidden;
    }

    .reconciliation-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .reconciliation-content {
      padding: 32px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      border-radius: var(--border-radius);
      padding: 24px;
      text-align: center;
      border: 1px solid var(--border-light);
      transition: var(--transition);
      box-shadow: var(--shadow-medium);
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
      font-size: 32px;
      margin-bottom: 12px;
      display: block;
    }

    .stat-icon.matched { color: var(--success-color); }
    .stat-icon.discrepancy { color: var(--error-color); }
    .stat-icon.missing { color: var(--warning-color); }
    .stat-icon.total { color: #6366f1; }

    .table-container {
      background: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow-medium);
      border: 1px solid var(--border-light);
      margin-bottom: 24px;
    }

    .status-tag {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-matched {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .status-discrepancy {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .status-missing {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fed7aa;
    }

    .footer-summary {
      background: linear-gradient(135deg, #1e293b, #334155);
      color: white;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: var(--border-radius);
      margin-top: 24px;
    }

    .amount-difference {
      font-weight: 600;
    }

    .amount-difference.positive { color: var(--success-color); }
    .amount-difference.negative { color: var(--error-color); }
    .amount-difference.zero { color: var(--success-color); }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .btn-primary {
      background: var(--primary-gradient) !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
    }

    .btn-success {
      background: var(--success-color) !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
    }

    .btn-secondary {
      background: var(--background-light) !important;
      color: var(--text-primary) !important;
      border: 1px solid var(--border-light) !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
    }

    @media (max-width: 768px) {
      .reconciliation-container { padding: 16px; }
      .reconciliation-content { padding: 24px 16px; }
      .reconciliation-header { padding: 24px 16px; }
      .header-content { flex-direction: column; gap: 16px; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-summary { flex-direction: column; gap: 16px; text-align: center; }
      .action-buttons { justify-content: center; }
    }
  `}</style>
);