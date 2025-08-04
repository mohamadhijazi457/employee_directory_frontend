import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/common.css';
import { Employee, Gender } from '../../types/employee';
import { createEmployee, updateEmployee } from '../../api/employee';
import Input from '../common/input';
import Select from '../common/select';
import Button from '../common/button';

interface Props {
  mode: 'create' | 'update';
  employee?: Employee;
  onSuccess: () => void;
  onClose: () => void;
}

const genderOptions = [
  { value: Gender.MALE, label: 'Male' },
  { value: Gender.FEMALE, label: 'Female' },
];

type FormState = Omit<Employee, 'id' | 'created_at' | 'updated_at'>;

const EmployeeForm: React.FC<Props> = ({ mode, employee, onSuccess, onClose }) => {
  const [form, setForm] = useState<FormState>({
    fullname: '',
    email: '',
    phone: '',
    city: '',
    gender: Gender.MALE,
    date_of_birth: '',
    marital_status: '',
    education: '',
    skills: [],
    manager_id: null,
    position: '',
    salary: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');

  useEffect(() => {
    if (mode === 'update' && employee) {
      const { id, created_at, updated_at, ...rest } = employee;
      setForm(rest);
    }
  }, [mode, employee]);

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
    setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    // Front-end validation: salary must not be null
    if (form.salary == null) {
      setErrors({ salary: 'Salary should not be null.' });
      return;
    }

    try {
      if (mode === 'create') {
        await createEmployee(form);
      } else if (employee) {
        await updateEmployee(employee.id, form);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const msg: string = err.response.data.message || 'An error occurred';
        const newErrors: Record<string, string> = {};

        // Duplicate email check
        if (
          msg.toLowerCase().includes('email') &&
          (msg.toLowerCase().includes('already exists') ||
            msg.toLowerCase().includes('duplicate'))
        ) {
          newErrors.email = 'This email address is already in use.';
          setErrors(newErrors);
          return;
        }

        // Salary null check from server
        if (
          msg.toLowerCase().includes('salary') &&
          msg.toLowerCase().includes('null')
        ) {
          newErrors.salary = 'Salary should not be null.';
          setErrors(newErrors);
          return;
        }

        // Field-specific mapping
        [
          'fullname',
          'email',
          'phone',
          'city',
          'gender',
          'date_of_birth',
          'marital_status',
          'education',
          'position',
          'salary',
        ].forEach(field => {
          if (msg.toLowerCase().includes(field.replace('_', ' '))) {
            newErrors[field] = msg;
          }
        });

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
          setGeneralError(msg);
        }
      } else {
        setGeneralError('Unexpected error. Please try again.');
      }
      console.error('Form submission error:', err);
    }
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {generalError && (
        <div style={{ ...errorStyle, marginBottom: '1rem' }}>{generalError}</div>
      )}

      <div className="form-grid">
        <div>
          <label className="form-label">Full Name</label>
          <Input
            value={form.fullname}
            onChange={e => handleChange('fullname', e.target.value)}
            required
          />
          {errors.fullname && <p style={errorStyle}>{errors.fullname}</p>}
        </div>

        <div>
          <label className="form-label">Email</label>
          <Input
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            required
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div>
          <label className="form-label">Phone</label>
          <Input
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            required
          />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>

        <div>
          <label className="form-label">City</label>
          <Input
            value={form.city}
            onChange={e => handleChange('city', e.target.value)}
            required
          />
          {errors.city && <p style={errorStyle}>{errors.city}</p>}
        </div>

        <div>
          <label className="form-label">Gender</label>
          <Select
            options={genderOptions}
            value={form.gender}
            onChange={e => handleChange('gender', e.target.value as Gender)}
            required
          />
          {errors.gender && <p style={errorStyle}>{errors.gender}</p>}
        </div>

        <div>
          <label className="form-label">Date of Birth</label>
          <Input
            type="date"
            value={form.date_of_birth}
            onChange={e => handleChange('date_of_birth', e.target.value)}
            required
          />
          {errors.date_of_birth && <p style={errorStyle}>{errors.date_of_birth}</p>}
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Marital Status</label>
          <Input
            value={form.marital_status}
            onChange={e => handleChange('marital_status', e.target.value)}
            required
          />
          {errors.marital_status && <p style={errorStyle}>{errors.marital_status}</p>}
        </div>

        <div>
          <label className="form-label">Education</label>
          <Input
            value={form.education}
            onChange={e => handleChange('education', e.target.value)}
            required
          />
          {errors.education && <p style={errorStyle}>{errors.education}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Skills</label>
        <Input
          value={form.skills.join(', ')}
          onChange={e => handleChange('skills', e.target.value.split(',').map(s => s.trim()))}
          placeholder="e.g. React, Node.js"
          required
        />
        {errors.skills && <p style={errorStyle}>{errors.skills}</p>}
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Manager ID</label>
          <Input
            type="number"
            value={form.manager_id != null ? form.manager_id : ''}
            onChange={e => handleChange('manager_id', e.target.value ? parseInt(e.target.value) : null)}
          />
          {errors.manager_id && <p style={errorStyle}>{errors.manager_id}</p>}
        </div>

        <div>
          <label className="form-label">Position</label>
          <Input
            value={form.position}
            onChange={e => handleChange('position', e.target.value)}
            required
          />
          {errors.position && <p style={errorStyle}>{errors.position}</p>}
        </div>

        <div>
          <label className="form-label">Salary</label>
          <Input
            type="number"
            value={form.salary}
            onChange={e => handleChange('salary', Number(e.target.value))}
            required
          />
          {errors.salary && <p style={errorStyle}>{errors.salary}</p>}
        </div>
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">{mode === 'create' ? 'Create' : 'Update'}</Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
