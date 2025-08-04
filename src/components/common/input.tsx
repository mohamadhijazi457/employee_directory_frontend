import React from 'react';
import '../../styles/common.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input className={`input ${className}`} {...props} />
);

export default Input;