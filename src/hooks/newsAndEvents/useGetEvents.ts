import { useQuery, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import type { EventType } from 'types/EventTypes';

const API_URL = `${process.env.API_BASE_URL}/api/Event/GetAllEvents`;

export function useGetEvents() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<EventType[]>('events', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  });
}
