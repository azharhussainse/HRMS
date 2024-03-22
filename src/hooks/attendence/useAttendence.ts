import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import type { AttendanceType } from 'types/AttendanceType';

const API_URL = `${process.env.API_BASE_URL}/api/Attendance/GetEmployeesAttendanceStatus`;

// Fetch all employees
export function useAttendence() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  return useQuery<AttendanceType[]>('attendance', async () => {
    const response = await fetch(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  });
}
