import ProtectedRote from '@/components/RouteProtection';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { SkewLoader } from 'react-spinners';

function Auth({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const protectedRoutes = router.asPath;

  return (
    <>
      {status === 'loading' ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20rem'
          }}
        >
          <SkewLoader color="#1273EB" size={50} />
        </div>
      ) : (
        <>
          {protectedRoutes.includes(router.pathname) ? (
            <ProtectedRote>{children}</ProtectedRote>
          ) : (
            children
          )}
        </>
      )}
    </>
  );
}

export default Auth;
