import { useQuery, useMutation, useQueryClient } from 'react-query';
import type { EmployeeType } from 'types/EmployeeType';

const API_URL = ' http://localhost:8000/employees';

// Update an employee
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedEmployee: EmployeeType) => {
      const response = await fetch(`${API_URL}/${updatedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
      }
    }
  );
}
