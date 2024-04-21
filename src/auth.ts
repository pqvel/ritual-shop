import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod"
import db from "../db/db";
import { User } from "@prisma/client";
import CryptoJS from "crypto-js"

const getUser = async (email: string): Promise<User | undefined> => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) throw new Error("Неверный логин или пароль")
    
    return user
  } catch (error) {
    console.log(error)
    throw new Error('Неправильный логин или пароль')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const paresedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials)
        
        if (paresedCredentials.success) {
          const { email, password } = paresedCredentials.data
          const user = await getUser(email)
          if (!user) return null
          const passwordMatch = CryptoJS.SHA256(password).toString() === user.password
          if (passwordMatch) return user
        }

        console.log("Неверный логин или пароль")
        return null
      }
    })
  ]
});
