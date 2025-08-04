import React from 'react';
import '../../styles/common.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const btnClass = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`;
  return (
    <button {...props} className={btnClass}>
      {children}
    </button>
  );
};

export default Button;