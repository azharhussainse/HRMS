import { useMutation, useQueryClient } from 'react-query';
import type { NotesType } from 'types/NotesType';

const API_URL = `${process.env.API_BASE_URL}/api/Notes/UpdateNotes`;
export function useUpdateNotes() {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedNote: NotesType) => {
      const response = await fetch(`${API_URL}/${updatedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedNote)
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
      }
    }
  );
}
