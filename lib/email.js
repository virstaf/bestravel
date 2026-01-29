import ReservationConfirmationEmail from "@/email-templates/confirm-reservation";
import SubscriptionEmail from "@/email-templates/confirm-subscription";
import TripConfirmationEmail from "@/email-templates/confirm-trip";
import ContactEmail from "@/email-templates/contact";
import ReservationAdminEmail from "@/email-templates/reservation-admin";
import ReservationEmail from "@/email-templates/reservation-email";
import TrialConfirmationEmail from "@/email-templates/trial";
import TrialEndingReminderEmail from "@/email-templates/trial-ending-reminder";
import WelcomeEmail from "@/email-templates/welcome";
import QuoteNotificationEmail from "@/email-templates/quote-notification";
import QuoteAcceptanceEmail from "@/email-templates/quote-acceptance";
import QuoteRejectionEmail from "@/email-templates/quote-rejection";
import QuoteAdminNotificationEmail from "@/email-templates/quote-admin-notification";
import TrialExpiredEmail from "@/email-templates/trial-expired";
import PaymentFailedEmail from "@/email-templates/payment-failed";
import SubscriptionCanceledEmail from "@/email-templates/subscription-canceled";
import RenewalReminderEmail from "@/email-templates/renewal-reminder";
import { Resend } from "resend";

export const sendEmail = async (values, type) => {
  let adminEmail = "noreply@virstravelclub.com";
  let receivingEmail, emailTemplate, subject;

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing");
    return { success: false, message: "Server configuration error" };
  }

  try {
    switch (type) {
      case "contact":
        emailTemplate = <ContactEmail fullname={values.fullname} />;
        subject = "We've got your message";
        receivingEmail = values.email;
        adminEmail = "info@virstravelclub.com";
        break;

      case "welcome":
        emailTemplate = (
          <WelcomeEmail
            fullname={values.fullname}
            membershipId={values.membershipId}
          />
        );
        subject = "Welcome to Virstravel Club";
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "confirm-trial":
        emailTemplate = (
          <TrialConfirmationEmail
            fullname={values.fullname}
            trialEndsAt={values.trialEndsAt}
          />
        );
        subject = "Your trial is confirmed!";
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "confirm-subscription":
        emailTemplate = (
          <SubscriptionEmail
            fullname={values.fullname}
            link={values.link}
            plan={values.plan}
          />
        );
        subject = `Your ${values.plan} subscription is confirmed!`;
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "trial-ending-reminder":
        emailTemplate = (
          <TrialEndingReminderEmail
            fullname={values.fullname}
            trialEndsAt={values.trialEndsAt}
            link={values.link}
          />
        );
        subject = "Your Virstravel trial ends in 3 days!";
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "trial-expired":
        emailTemplate = (
          <TrialExpiredEmail fullname={values.fullname} link={values.link} />
        );
        subject = "Your Virstravel trial has expired";
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "payment-failed":
        emailTemplate = (
          <PaymentFailedEmail
            fullname={values.fullname}
            plan={values.plan}
            link={values.link}
          />
        );
        subject =
          "Action Required: Payment failed for your Virstravel subscription";
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "subscription-canceled":
        emailTemplate = (
          <SubscriptionCanceledEmail
            fullname={values.fullname}
            plan={values.plan}
            link={values.link}
          />
        );
        subject =
          "Confirmation: Your Virstravel subscription has been canceled";
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      case "subscription-renewal-reminder":
        emailTemplate = (
          <RenewalReminderEmail
            fullname={values.fullname}
            plan={values.plan}
            renewalDate={values.renewalDate}
            link={values.link}
          />
        );
        subject = `Your ${values.plan} subscription will renew soon`;
        receivingEmail = values.email;
        adminEmail = "membership@virstravelclub.com";
        break;

      default:
        // Handle all other types (reservation, quote, etc) by sticking to the original logic if needed
        // but for now let's focus on subscriptions.
        return { success: false, message: `Unsupported email type: ${type}` };
    }

    const { data, error } = await resend.emails.send({
      from: adminEmail,
      to: receivingEmail,
      subject: subject,
      react: emailTemplate,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
};
