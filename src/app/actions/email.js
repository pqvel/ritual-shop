"use server";
import { z } from "zod";
import nodemailer from "nodemailer";

const emailBodySchema = z.object({
  name: z.string().min(2, "Заполните поле"),
  phone: z.string().min(9, "Заполните поле"),
  message: z.string().optional(),
});

export const sendEmail = async (state, formData) => {
  const result = emailBodySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false)
    return { ...result.error.formErrors.fieldErrors, success: false };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "Новое сообщение с сайта",
    html: /*html*/ `
      <h1>Новое сообщение с сайта</h1>
      <p><b>Имя:</b> ${result.data.name}</p>
      <p><b>Телефон:</b> 
        <a href="tel:${result.data.phone.replace(/[^\d+]/g, "")}">
          ${result.data.phone}</p>
        </a>
      <p><b>Сообщение:</b></p>
      <p>${result.data.message}</p>
    `,
  };

  const sendMailResponse = await transporter.sendMail(mailOptions);

  return { success: true, name: [], phone: [] };
};
