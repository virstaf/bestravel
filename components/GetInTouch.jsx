import Link from "next/link";
import ContactForm from "./ui/contactForm";
import { Button } from "./ui/button";

const GetInTouch = () => {
  return (
    <div className="w-full py-12 bg-primary-foreground">
      <div className="container px-4 md:px-8 lg:px-12 mx-auto">
        <h2 className="text-sm uppercase font-bold text-center mb-6">
          📞 Get in Touch!
        </h2>
        <div className="grid xl:grid-cols-2 justify-center">
          <div className="flex flex-col gap-4 max-w-[750px] py-6 mx-auto">
            <p>
              Have questions? Need help with your membership? Fill out the form
              below, and our travel experts will get back to you ASAP!
            </p>
            <ul className="mb-6">
              <li>📞 Call Us: +44 (0) 1234 567 890</li>
              <li>📧 Email Us: support@bestravelperks.com</li>
            </ul>
            <div className="button">
              <Button asChild>
                <Link
                  href="/docs/Bestravel_Club_Top_10_Perk_eBook_with_CTA.pdf"
                  download="Bestravel_Perk_eBook"
                >
                  Download Guide
                </Link>
              </Button>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
