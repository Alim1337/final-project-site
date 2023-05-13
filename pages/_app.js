import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import AuthComponent from '@/components/useSession';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}
    >
      <AuthComponent />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
