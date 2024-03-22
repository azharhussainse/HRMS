import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import type { NewEmployeeType } from 'types/EmployeeType';
import { useToasts } from 'react-toast-notifications';
const API_URL = `${process.env.API_BASE_URL}/api/Account/RegisterEmployee`;

// Create an employee
export function useAddEmployee() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useMutation(
    async (newEmployee: NewEmployeeType) => {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEmployee)
      });
      if (!response.ok) {
        throw new Error('Failed to insert new employee');
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
        addToast('Employee added successfully!', { appearance: 'success' });
      },
      onError: error => {
        // Handle the error here, e.g., display a toast notification
        addToast('Error adding employee', { appearance: 'error' });
        // You can use a toast library or your preferred method to display the error message
      }
    }
  );
}
