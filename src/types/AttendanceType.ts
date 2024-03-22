export type AttendanceType = {
  name: string;
  employeeCode: string;
  profile: string;
  position: string;
  mobile: string;
  status: string;
  id: string;
};
export type AttendanceReport = {
  timeIn: string;
  timeInDay: string;
  timeOut: string;
  workingHours: number;
  breakDuration: string;
  employeeId: string;
};
