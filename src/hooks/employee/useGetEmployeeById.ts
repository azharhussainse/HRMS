import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { EmployeeType } from 'types/EmployeeType';

export function useGetEmployeeById(employeeId: number) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<EmployeeType>(['employee', employeeId], async () => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/Employee/GetById/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    return data;
  });
}
