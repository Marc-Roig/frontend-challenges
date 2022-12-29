import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
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

export default trpc.withTRPC(MyApp);
