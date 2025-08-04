export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}
  
export interface Employee {
    id: number
    fullname: string
    email: string
    phone: string
    city: string
    gender: Gender
    date_of_birth: string
    marital_status: string
    education: string
    skills: string[]
    manager_id: number | null
    position: string
    salary: number
    created_at: string
    updated_at: string
}
  
export type EmployeePayload = Omit<Employee, 'id' | 'created_at' | 'updated_at'>;
