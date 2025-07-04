"use server";

// import { render } from "@react-email/components";
import ContactEmail from "@/email-templates/contact";
import WelcomeEmail from "@/email-templates/welcome";
import { Resend } from "resend";

export const resendEmail = async (values, type) => {
  const adminEmail = "noreply@virstravelclub.com";
  let receivingEmail, emailTemplate, subject;

  if (type === "contact") {
    const { fullname, email, message } = values;
    emailTemplate = <ContactEmail fullname={fullname} />;
    subject = "We've got your message";
    receivingEmail = email;

    if (!fullname || !email || !message) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  if (type === "welcome") {
    const { fullname, membershipId, email } = values;
    console.log("Welcome email values:", values);
    emailTemplate = (
      <WelcomeEmail fullname={fullname} membershipId={membershipId} />
    );
    subject = "Welcome to Virstravel Club";
    receivingEmail = email;

    if (!fullname || !membershipId || !email) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  if (!resend) {
    console.error("Resend client could not be initialized");
    return { success: false, message: "Resend client initialization failed" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: adminEmail,
      to: receivingEmail,
      subject: subject,
      react: emailTemplate,
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
