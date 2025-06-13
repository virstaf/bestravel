"use server";

import ContactEmail from "@/email-templates/contact";
import { Resend } from "resend";

// import Resend from "resend";

export const resendEmail = async (values) => {
  const { fullname, email, message } = values;

  if (!fullname || !email || !message) {
    console.error("Missing required fields");
    return { success: false, message: "All fields are required" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  if (!resend) {
    console.error("Resend client could not be initialized");
    return { success: false, message: "Resend client initialization failed" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@virstravelclub.com",
      to: email,
      subject: "We’ve Got Your Message!",
      react: <ContactEmail fullname={fullname} />,
      //   html: `
      //     <p>Hi ${fullname},</p>
      //     <p>Thank you for reaching out to us! We have received your message and will get back to you shortly.</p>`,
    });

    if (error) {
      console.error("Error:", error);
      return { success: false, message: "Failed to send email" };
    }
    if (!data) {
      console.error("No data returned from Resend");
      return { success: false, message: "No data returned from Resend" };
    }

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
};
