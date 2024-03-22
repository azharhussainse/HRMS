import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { LeavesReport } from 'types/LeavesReport';

const API_URL = `${process.env.API_BASE_URL}/api/LeaveApplication/LeavesReport`;

// Fetch all leaves
export function useGetLeavesReport() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useQuery<LeavesReport>('leaveReport', async () => {
    if (!token) {
      throw new Error('No token available');
    }

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leavesReport');
    }

    const data = await response.json();
    return data;
  });
}
