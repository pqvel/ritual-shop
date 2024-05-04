import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { SHA256 } from "crypto-js";
import db from "../../../../../db/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;

        if (user.password === SHA256(credentials!.password).toString()) {
          // return {};
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
