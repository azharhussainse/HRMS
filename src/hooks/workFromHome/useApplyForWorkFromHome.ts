import { useMutation, useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import type { RequestModalType } from 'types/LeavesReport';
import { jsonToFormData } from '@/utils/jsonToFormData';
import { useToasts } from 'react-toast-notifications';

const API_URL = `${process.env.API_BASE_URL}/api/WorkFromHome/ApplyForWorkFromHome`;

export function useApplyForWorkFromHome() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { addToast } = useToasts();

  return useMutation(
    async (workFromHomeData: RequestModalType) => {
      const convertedFormData = jsonToFormData(workFromHomeData);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: convertedFormData
      });

      if (!response.ok) {
        throw new Error('Failed to apply for work from home');
      }
      const responseData = await response.json();

      if (responseData.message === 'Applied for Work From Home') {
        addToast(responseData.message, { appearance: 'success' });
      }
      if (responseData.message === 'Already apply for Work From Home') {
        addToast(responseData.message, { appearance: 'warning' });
      }

      return responseData;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('workFromHome');
      }
    }
  );
}
