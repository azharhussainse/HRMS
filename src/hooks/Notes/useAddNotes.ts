import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import type { NewNoteType } from 'types/NotesType';
const API_URL = `${process.env.API_BASE_URL}/api/Notes/AddNotes`;

export function useAddNotes() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (newNote: NewNoteType) => {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newNote)
      });
      if (!response.ok) {
        throw new Error('Failed to insert new Note');
      }
      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
      }
    }
  );
}
