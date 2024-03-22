import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';

const API_URL = `${process.env.API_BASE_URL}/api/Notes/DeleteNotes`;
// Delete Note
export function useDeleteNotes() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useMutation(
    async (noteId: string) => {
      const response = await fetch(`${API_URL}/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
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
