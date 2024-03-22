import Auth from '@/components/AuthWrapper';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import HRMPageLayout from '@/components/HRMPageLayout';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { Grid } from '@mui/material';
import { ToastProvider } from 'react-toast-notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Check if the current route path is "forgot-password" or "login" or "reset-password"
  const isForgotPasswordOrLoginPage =
    router.pathname === '/forgot-password' ||
    router.pathname === '/login' ||
    router.pathname === '/reset-password';

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {/* @ts-ignore */}
      <SessionProvider session={pageProps.session}>
        {/* Only show the component for "forgot-password" and "login" routes */}
        {isForgotPasswordOrLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <Auth>
            <HRMPageLayout>
              <ToastProvider autoDismiss={true}>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <NavBar />
                  </Grid>
                  {/* Show the SideBar only for pages other than "forgot-password" and "login" */}
                  {!isForgotPasswordOrLoginPage && (
                    <Grid item xs={3} md={2.2}>
                      <SideBar />
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={isForgotPasswordOrLoginPage ? 12 : 9}
                    md={isForgotPasswordOrLoginPage ? 12 : 9.8}
                  >
                    <Component {...pageProps} />
                  </Grid>
                </Grid>
              </ToastProvider>
            </HRMPageLayout>
          </Auth>
        )}
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
