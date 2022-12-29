import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

// Article explaining how to use NextAuth with CredentialsProvider
// https://dev.to/franciscomendes10866/nextjs-authentication-with-next-auth-trpc-and-prisma-kgl
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      if (session.user) {
        session.user.id = (token?.id as string) || user?.id;
        session.user.email = token?.email || user?.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
            password: { not: null },
          },
        });
        if (!user) return null;

        // const isValid = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );
        // if (!isValid) {
        //   throw new Error("Invalid password");
        // }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export default NextAuth(authOptions);
