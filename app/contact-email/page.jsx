import ContactEmail from "@/email-templates/contact";

const ContactEmailPage = ({ name = "Nyla" }) => {
  return (
    <>
      <ContactEmail fullname={name} />
    </>
  );
};

export default ContactEmailPage;
