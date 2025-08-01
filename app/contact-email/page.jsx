import ReservationConfirmationEmail from "@/email-templates/confirm-reservation";
import SubscriptionEmail from "@/email-templates/confirm-subscription";
import TripConfirmationEmail from "@/email-templates/confirm-trip";
import ContactEmail from "@/email-templates/contact";
import ReservationAdminEmail from "@/email-templates/reservation-admin";
import ReservationEmail from "@/email-templates/reservation-email";
import TrialConfirmationEmail from "@/email-templates/trial";
import WelcomeEmail from "@/email-templates/welcome";
import { destinations } from "@/lib/data";

const ContactEmailPage = ({ name = "Nyla" }) => {
  return (
    <>
      {/* <ContactEmail fullname={name} />
      <WelcomeEmail fullname={name} membershipId="V120809801" />
      <TripConfirmationEmail
        fullname={name}
        tripName={"Beach Vacation"}
        tripLink={"https://virstravel.com/trip/12345"}
      />
      <ReservationConfirmationEmail
        fullname={name}
        link={"https://virstravel.com/reservation/12345"}
        type={"hotel"}
      />
      <TrialConfirmationEmail
        fullname={name}
        trialEndsAt={new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString()}
      /> */}
      {/* <SubscriptionEmail
        fullname={name}
        link={"https://virstravel.com/trial/12345"}
        plan={"silver"}
      /> */}
      {/* <ReservationEmail
        fullname={name}
        details={{
          name: "Hotel California",
          city: "Los Angeles",
          destination: "San Francisco",
          link: "https://virstravel.com/reservation/12345",
        }}
        type={"flight"}
      /> */}
      {/* <ReservationAdminEmail
        details={{
          fullname: name,
          name: "Hotel California",
          city: "Los Angeles",
          destination: "San Francisco",
          link: "https://virstravel.com/reservation/12345",
        }}
        type={"flight"}
      /> */}
    </>
  );
};

export default ContactEmailPage;
