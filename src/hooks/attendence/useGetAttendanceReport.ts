import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import type { AttendanceReport } from 'types/AttendanceType';
const API_URL = `${process.env.API_BASE_URL}/api/Attendance/GetEmployeeAttendanceReport`;

// Fetch attendance report
export function useGetAttendanceReport() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useQuery<AttendanceReport[]>('attendanceReport', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  });
}
