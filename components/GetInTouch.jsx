import ContactForm from "./ui/contactForm";

const GetInTouch = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12">
        <div>
          <h2 className="text-sm uppercase font-bold text-center">
            📞 Get in Touch!
          </h2>
          <p>
            Have questions? Need help with your membership? Fill out the form
            below, and our travel experts will get back to you ASAP!
          </p>
          <ul>
            <li>📞 Call Us: +44 (0) 1234 567 890</li>
            <li>📧 Email Us: support@bestravelperks.com</li>
          </ul>
        </div>
        <ContactForm />
        {/* <span>contact form</span> */}
      </div>
    </div>
  );
};

export default GetInTouch;
