import React from 'react';
import '../../styles/common.css';

type Option = { value: string; label: string };
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ options, className = '', ...props }) => (
  <select className={`input ${className}`} {...props}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;