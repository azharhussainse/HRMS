import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { NotesType } from 'types/NotesType';

const API_URL = `${process.env.API_BASE_URL}/api/Notes/GetAllNotes`;

// Fetch all Notes
export function useGetNotes() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<NotesType[]>('notes', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  });
}
