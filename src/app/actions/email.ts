"use server";
import { z } from "zod";
import nodemailer from "nodemailer";

const emailBodySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(9),
  message: z.string().optional(),
});

export const sendEmail = async (state: any, formData: FormData) => {
  const result = emailBodySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "Новое сообщение с сайта",
    html: `
      <h1>Новое сообщение с сайта</h1>
      <p>Имя: ${result.data.name}</p>
      <p>Телефон: ${result.data.phone}</p>
      <p>Сообщение: ${result.data.message}</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};
