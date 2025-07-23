import Link from "next/link";
import ContactForm from "./ui/contactForm";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

const GetInTouch = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Get in Touch!
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our support team is available around the clock to help you.
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-8 justify-center">
          <div className="article flex flex-col gap-4 max-w-[750px] py-6 text-gray-600 mx-auto">
            <p className="mt-4 ">
              Have questions? Need help with your membership? Fill out the form
              below, and our travel experts will get back to you ASAP!
            </p>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <Phone />
                <span className="text-lg">Call us: +440 126 452 7030</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail />
                <span className="text-lg">
                  Email us: info@virstravelclub.com
                </span>
              </div>
            </div>
            <div className="button">
              <Button asChild className="w-full md:w-auto text-white">
                <Link
                  href="/docs/Virstravel_Club_Top_10_Perk_eBook.pdf"
                  className="!text-white !no-underline"
                  download="Virstravel_Perk_eBook"
                >
                  <span>
                    <Download />
                  </span>
                  Download Guide
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-center xl:justify-end items-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
