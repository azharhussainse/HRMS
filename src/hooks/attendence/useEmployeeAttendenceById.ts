import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { AttendanceType } from 'types/AttendanceType';

const API_URL = `${process.env.API_BASE_URL}/api/Attendance/GetEmployeesAttendanceReport`;

// Fetch all employees attendance
export function useAttendance() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<AttendanceType[]>('attendance', async () => {
    const response = await fetch(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return await response.json();
  });
}
