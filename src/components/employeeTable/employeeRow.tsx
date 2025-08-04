import React from 'react';
import '../../styles/common.css';
import { Employee } from '../../types/employee';

interface EmployeeRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onRefresh: () => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, onEdit, onRefresh }) => (
  <tr>
    <td>{employee.id}</td>
    <td>{employee.fullname}</td>
    <td>{employee.email}</td>
    <td>{employee.gender}</td>
    <td>{employee.position}</td>
    <td>{employee.city}</td>
    <td className="actions-cell">
      <button onClick={() => onEdit(employee)} className="action-btn edit">Edit</button>
      <button onClick={onRefresh} className="action-btn delete">Delete</button>
    </td>
  </tr>
);

export default EmployeeRow;