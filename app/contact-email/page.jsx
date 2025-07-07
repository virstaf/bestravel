import ContactEmail from "@/email-templates/contact";
import WelcomeEmail from "@/email-templates/welcome";

const ContactEmailPage = ({ name = "Nyla" }) => {
  return (
    <>
      <ContactEmail fullname={name} />
      {/* <WelcomeEmail fullname={name} membershipId="V120809801" /> */}
    </>
  );
};

export default ContactEmailPage;
