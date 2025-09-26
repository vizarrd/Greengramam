import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`card ${hover ? 'hover:shadow-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;