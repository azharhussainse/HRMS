import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import type { EventType } from 'types/EventTypes';

const API_URL = `${process.env.API_BASE_URL}/api/Event/AddEvent`;

export function useAddEvent() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (newEvent: EventType) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      });

      if (!response.ok) {
        throw new Error('Failed to insert new event');
      }

      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events'); // Invalidate the 'events' query to refresh the data
      }
    }
  );
}
