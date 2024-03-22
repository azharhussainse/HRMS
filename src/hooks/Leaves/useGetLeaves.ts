import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { LeaveType } from 'types/LeaveType';

const API_URL = `${process.env.API_BASE_URL}/api/LeaveApplication/GetAllLeaveApplications`;

// Fetch all leaves
export function useGetLeaves() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<LeaveType[]>('leaves', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  });
}
