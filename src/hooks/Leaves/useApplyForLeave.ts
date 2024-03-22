import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import type { RequestModalType } from 'types/LeavesReport';
import { jsonToFormData } from '@/utils/jsonToFormData';
import { useToasts } from 'react-toast-notifications';

const API_URL = `${process.env.API_BASE_URL}/api/LeaveApplication/ApplyForLeave`;

export function useApplyForLeave() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { addToast } = useToasts();

  return useMutation(
    async (leaveData: RequestModalType) => {
      const convertedFormData = jsonToFormData(leaveData);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: convertedFormData
      });

      if (!response.ok) {
        throw new Error('Failed to apply for leave');
      }

      const responseData = await response.json();

      if (responseData.message === 'Applied for leave successfully') {
        addToast(responseData.message, { appearance: 'success' });
      }
      if (
        responseData.message ===
        'The Date you selected is already applied for leave'
      ) {
        addToast(responseData.message, { appearance: 'warning' });
      }

      return responseData;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('leave');
      }
    }
  );
}
