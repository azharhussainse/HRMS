import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import type { DesignationType } from 'types/DesignationType';

const API_URL = `${process.env.API_BASE_URL}/api/Designation/GetAllDesignations`;

export function useDesignations() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useQuery<DesignationType[]>('designations', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  });
}