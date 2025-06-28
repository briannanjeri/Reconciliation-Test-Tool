import React from 'react';
import '../styles/Button.css';

const Button = ({ 
  children, 
  type = 'primary', 
  onClick, 
  disabled = false, 
  loading = false, 
  icon, 
  style = {} 
}) => {
  const className = `btn btn-${type}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? (
        <>
          <div className="loading"></div>
          {children}
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;