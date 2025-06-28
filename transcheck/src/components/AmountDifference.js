import React from 'react';

export const AmountDifference = ({ difference }) => {
  const getClassName = () => {
    if (Math.abs(difference) < 0.01) return 'zero';
    return difference > 0 ? 'positive' : 'negative';
  };

  const getPrefix = () => {
    if (Math.abs(difference) < 0.01) return '';
    return difference > 0 ? '+' : '';
  };

  return (
    <span className={`amount-difference ${getClassName()}`}>
      {getPrefix()}${difference.toFixed(2)}
    </span>
  );
};