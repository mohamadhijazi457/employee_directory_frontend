// src/components/employeeTable/employeeTable.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { fetchEmployees } from '../../api/employee';
import { Employee } from '../../types/employee';
import SearchBar from './searchBar';
import EmployeeRow from './employeeRow';
import Modal from '../common/modal';
import EmployeeForm from './employeeForm';
import Button from '../common/button';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [search, setSearch] = useState('');

  const load = useCallback(
    async (reset = false) => {
      const res = await fetchEmployees(
        reset ? undefined : cursor ?? undefined,
        search
      );
      setEmployees(reset ? res.employees : [...employees, ...res.employees]);
      setCursor(res.nextCursor);
    },
    [cursor, search, employees]
  );

  useEffect(() => {
    load(true);
  }, [search]);

  const openForm = (emp?: Employee) => {
    setSelected(emp || null);
    setModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <SearchBar onSearch={setSearch} onAddNew={() => openForm()} />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase">Full Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase">Email</th>
              <th className="px-4 py-2 text-center text-sm font-semibold uppercase">Gender</th>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase">Position</th>
              <th className="px-4 py-2 text-left text-sm font-semibold uppercase">City</th>
              <th className="px-4 py-2 text-right text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map(emp => (
              <EmployeeRow
                key={emp.id}
                employee={emp}
                onEdit={() => openForm(emp)}
                onRefresh={() => load(true)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {cursor && (
        <div className="mt-4 text-center">
          <Button onClick={() => load()}>Load More</Button>
        </div>
      )}

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm
          mode={selected ? 'update' : 'create'}
          employee={selected ?? undefined}
          onSuccess={() => {
            setModalOpen(false);
            load(true);
          }}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeTable;
