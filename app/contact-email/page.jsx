import ReservationConfirmationEmail from "@/email-templates/confirm-reservation";
import TripConfirmationEmail from "@/email-templates/confirm-trip";
import ContactEmail from "@/email-templates/contact";
import WelcomeEmail from "@/email-templates/welcome";

const ContactEmailPage = ({ name = "Nyla" }) => {
  return (
    <>
      {/* <ContactEmail fullname={name} /> */}
      {/* <WelcomeEmail fullname={name} membershipId="V120809801" /> */}
      {/* <TripConfirmationEmail
        fullname={name}
        tripName={"Beach Vacation"}
        tripLink={"https://virstravel.com/trip/12345"}
      /> */}
      <ReservationConfirmationEmail
        fullname={name}
        link={"https://virstravel.com/reservation/12345"}
        type={"hotel"}
      />
    </>
  );
};

export default ContactEmailPage;
