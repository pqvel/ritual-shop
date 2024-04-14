import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto-js";
import { z } from "zod";
import db from "../../../../db/db";

export const POST = async (request: NextRequest) => {
  try {
    const credentials: credentials = await request.json();
    const login = z
      .string()
      .regex(/^[A-Z0-9]+$/gim, "Invalid username") //I only accept alphanumeric chars.
      .parse(credentials.login);

    const user = await db.user.findUnique({
      where: { email: credentials.login },
    });

    if (user) {
      //Verify password
      const hashedPassword = crypto.SHA256(credentials.password).toString();

      if (hashedPassword === user.password) {
        return NextResponse.json(user);
      }
    }

    return NextResponse.json(null);
  } catch (err) {
    return NextResponse.json(null);
  }
};

type credentials = {
  login: string;
  password: string;
};
