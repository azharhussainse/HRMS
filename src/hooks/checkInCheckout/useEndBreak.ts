import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { useToasts } from 'react-toast-notifications';

const API_URL = `${process.env.API_BASE_URL}/api/Attendance/EndBreak`;

type EndBreak = {
  timeOut: Date | null;
};

export function useEndBreak() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (timeOut: EndBreak) => {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(timeOut)
      });
      if (!response.ok) {
        throw new Error('Failed to EndBreak');
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        addToast('You ended your break', { appearance: 'info' });
      }
    }
  );
}
