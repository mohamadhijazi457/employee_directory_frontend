import api from './axios';
import { Employee } from '../types/employee';

type EmployeePayload = Omit<Employee, 'id' | 'created_at' | 'updated_at'>;

export const fetchEmployees = async (
  cursor?: string,
  search?: string,
  limit = 25
): Promise<{ employees: Employee[]; nextCursor: string | null }> => {
  const body: Record<string, any> = { limit };
  if (cursor) body.paginationKey = cursor;
  if (search) body.searchQuery = search;

  const { data } = await api.post<{
    success: boolean;
    employees: Employee[];
    next_cursor: string | null;
  }>('/employees', body);

  return {
    employees: data.employees,
    nextCursor: data.next_cursor,
  };
};

export const createEmployee = async (
  employee: EmployeePayload
): Promise<Employee> => {
  const payload = {
    ...employee,
    skills: JSON.stringify(employee.skills),
  };

  const { data } = await api.post<{ success: boolean; employee: Employee }>(
    '/employees/create',
    payload
  );

  return data.employee;
};

export const updateEmployee = async (
  id: number,
  fields: Partial<Employee>
): Promise<Employee> => {
  const payload: any = { id, ...fields };
  if (fields.skills) {
    payload.skills = JSON.stringify(fields.skills);
  }

  const { data } = await api.post<{ success: boolean; employee: Employee }>(
    '/employees/edit',
    payload
  );

  return data.employee;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.post('/employees/delete', { id });
};
