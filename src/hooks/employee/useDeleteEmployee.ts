import { useMutation, useQueryClient } from 'react-query';
const API_URL = ' http://localhost:8000/employees';

// Delete an employee
export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation(
    async (employeeId: number) => {
      const response = await fetch(`${API_URL}/${employeeId}`, {
        method: 'DELETE'
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
