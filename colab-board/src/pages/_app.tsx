import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { useTheme } from "@/hooks/useTheme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useTheme();

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <TailwindIndicator />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
