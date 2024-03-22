import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { useToasts } from 'react-toast-notifications';

const API_URL = `${process.env.API_BASE_URL}/api/Attendance/MarkCheckOut`;

type CheckOut = {
  timeOut: Date | null;
};

export function useCheckOut() {
  const { addToast } = useToasts();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (timeOut: CheckOut) => {
      const response = await fetch(`${API_URL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(timeOut)
      });
      if (!response.ok) {
        throw new Error('Failed to Check Out');
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        addToast('Checked out successfully', { appearance: 'success' });
      }
    }
  );
}
