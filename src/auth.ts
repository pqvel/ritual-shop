import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./config/auth.config";
import db from "../db/db";
import { User } from "@prisma/client";

async function getUser(email: string): Promise<User | null> {
  try {
    const user = db.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error(`Неправильный логин или пароль`);
    }

    return user;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`Неправильный логин или пароль`);
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
        }

        return null;
      },
    }),
  ],
});
