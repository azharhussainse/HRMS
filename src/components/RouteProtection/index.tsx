import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function ProtectedRote({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session?.user.token) {
      router.push('/login');
    }
  }, [router, session?.user.token]);

  if (!session?.user.token) return null;

  return <>{children}</>;
}

export default ProtectedRote;
