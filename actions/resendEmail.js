"use server";

import ReservationConfirmationEmail from "@/email-templates/confirm-reservation";
import SubscriptionEmail from "@/email-templates/confirm-subscription";
import TripConfirmationEmail from "@/email-templates/confirm-trip";
import ContactEmail from "@/email-templates/contact";
import ReservationAdminEmail from "@/email-templates/reservation-admin";
import ReservationEmail from "@/email-templates/reservation-email";
import TrialConfirmationEmail from "@/email-templates/trial";
import WelcomeEmail from "@/email-templates/welcome";
import { Resend } from "resend";

export const resendEmail = async (values, type) => {
  let adminEmail = "noreply@virstravelclub.com";
  let receivingEmail, emailTemplate, subject;

  if (type === "contact") {
    const { fullname, email, message } = values;
    emailTemplate = <ContactEmail fullname={fullname} />;
    subject = "We've got your message";
    receivingEmail = email;
    adminEmail = "info@virstravelclub.com";

    if (!fullname || !email || !message) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  if (type === "welcome") {
    const { fullname, membershipId, email } = values;
    emailTemplate = (
      <WelcomeEmail fullname={fullname} membershipId={membershipId} />
    );
    subject = "Welcome to Virstravel Club";
    receivingEmail = email;
    adminEmail = "membership@virstravelclub.com";

    if (!fullname || !membershipId || !email) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  if (type === "confirm-trip") {
    const { fullname, tripName, email } = values;
    const tripLink = "https://virstravelclub.com/dashboard/trips";

    emailTemplate = (
      <TripConfirmationEmail
        fullname={fullname}
        tripName={tripName}
        tripLink={tripLink}
      />
    );
    subject = "Your trip is confirmed!";
    receivingEmail = email;
    adminEmail = "bookings@virstravelclub.com";

    console.log("values", values);

    if (!fullname || !tripName || !tripLink || !email) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  if (type === "confirm-reservation") {
    const { fullname, link, email } = values;

    emailTemplate = (
      <ReservationConfirmationEmail fullname={fullname} link={link} />
    );
    subject = `Your reservation is received!`;
    receivingEmail = email;
    adminEmail = "bookings@virstravelclub.com";

    if (!fullname || !email) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  if (type === "confirm-trial") {
    const { fullname, trialEndsAt, email } = values;

    emailTemplate = (
      <TrialConfirmationEmail fullname={fullname} trialEndsAt={trialEndsAt} />
    );
    subject = "Your trial is confirmed!";
    receivingEmail = email;
    adminEmail = "membership@virstravelclub.com";

    if (!fullname || !trialEndsAt || !email) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  // if (!receivingEmail || !emailTemplate || !subject) {
  //   console.error("Missing required parameters for email sending");
  //   return { success: false, message: "Missing required parameters" };
  // }

  if (type === "confirm-subscription") {
    const { fullname, link, plan, email } = values;

    emailTemplate = (
      <SubscriptionEmail fullname={fullname} link={link} plan={plan} />
    );
    subject = `Your ${plan} subscription is confirmed!`;
    receivingEmail = email;
    adminEmail = "membership@virstravelclub.com";

    if (!fullname || !plan || !email) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }

  if (type === "hotel" || type === "transfer" || type === "flight") {
    const { fullname, email, details } = values;
    console.log("fullname:", fullname);
    console.log("email:", email);
    console.log("details:", details);

    emailTemplate = (
      <ReservationEmail fullname={fullname} email={email} details={details} />
    );
    subject = `Your ${type} reservation has been received!`;
    receivingEmail = email;
    adminEmail = "bookings@virstravelclub.com";

    if (!fullname || !email || !details) {
      console.error("Missing required fields");
      return { success: false, message: "All fields are required" };
    }
  }
  if (!receivingEmail || !emailTemplate || !subject) {
    console.error("Missing required parameters for email sending");
    return { success: false, message: "Missing required parameters" };
  }

  if (
    type === "admin-flight" ||
    type === "admin-hotel" ||
    type === "admin-transfer"
  ) {
    console.log("admin details:", details);

    emailTemplate = (
      <ReservationAdminEmail details={details} type={type.split("-")[1]} />
    );
    subject = `New ${type.split("-")[1]} reservation received`;
    receivingEmail = "info@virstravelclub.com";
    adminEmail = "bookings@virstravelclub.com";
    if (!details) {
      console.error("Missing required fields for admin email");
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
