import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import type { RoleType } from 'types/RoleType';

const API_URL = `${process.env.API_BASE_URL}/api/Roles/GetAllRoles`;

export function useRoles() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  return useQuery<RoleType[]>('roles', async () => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  });
}