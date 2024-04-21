import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./config/auth.config";
import db from "../db/db";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'


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

// ( async () => {
//   const d = await bcrypt.hash("admin123", 10);
//   console.log(d)
// })()

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

          const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch) return user;

        }

        return null;
      },
    }),
  ],
});
