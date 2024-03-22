import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { EmployeeType } from 'types/EmployeeType';

const API_URL = `${process.env.API_BASE_URL}/api/Employee/GetAllEmployees`;

// Fetch all employees
export function useEmployees() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<EmployeeType[]>('employees', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  });
}
