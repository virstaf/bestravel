"use server";

import nodeMailer from "nodemailer";
// import { createClient } from "@/lib/supabase/server";

export const sendEmail = async (email, subject, message) => {
  // const { auth } = await createClient();

  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { errorMessage: null };
  } catch (error) {
    console.error("Error sending email:", error);
    return { errorMessage: error.message };
  }
};
