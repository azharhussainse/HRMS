import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { useToasts } from 'react-toast-notifications';

const API_URL = `${process.env.API_BASE_URL}/api/Attendance/StartBreak`;

type StartBreak = {
  timeIn: Date | null;
};

export function useStartBreak() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (timeIn: StartBreak) => {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(timeIn)
      });
      if (!response.ok) {
        throw new Error('Failed to  Start Break');
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        addToast('You Started your break', { appearance: 'info' });
      }
    }
  );
}
