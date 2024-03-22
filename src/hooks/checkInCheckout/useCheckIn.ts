import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { useToasts } from 'react-toast-notifications';

const API_URL = `${process.env.API_BASE_URL}/api/Attendance/MarkCheckIn`;

type CheckIn = {
  timeIn: Date | null;
};

export function useCheckIn() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (timeIn: CheckIn) => {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(timeIn)
      });
      if (!response.ok) {
        throw new Error('Failed to Check In');
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('attendance');
        addToast('Attendance has been marked Successfully', {
          appearance: 'success'
        });
      },
      onError: () => {
        addToast('Got error while connecting to server', {
          appearance: 'error'
        });
      }
    }
  );
}
