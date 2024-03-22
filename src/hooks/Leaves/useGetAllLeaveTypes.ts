import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { LeaveTypeType } from 'types/LeaveType';

const API_URL = `${process.env.API_BASE_URL}/api/LeaveType/GetAllLeaveTypes`;

// Fetch all Leave Types
export function useGetAllLeaveTypes() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useQuery<LeaveTypeType[]>('leaveTypes', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leave types');
    }

    const data = await response.json();
    return data;
  });
}
