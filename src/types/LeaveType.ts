export type LeaveType = {
  id: string;
  applicantId: string;
  applicantName: string;
  applicationStartDate: string;
  applicationEndDate: string;
  description: string;
  referenceNo: string;
  leaveTypeId: string;
  dateOfApproval: string;
  applicationDate: string;
  attachment: string | null;
  leaveStatus: 'Applied' | 'Rejected' | 'Approved';
};
export type LeaveTypeType = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
};
