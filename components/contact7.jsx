import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "./ui/contactForm";
import Link from "next/link";

const ContactUs = ({
  title = "Get in Touch!",
  description = "Our support team is available around the clock to help you.",
  emailLabel = "Email",
  emailDescription = "We respond to all emails within 24 hours.",
  email = "info@virstravelclub.com",
  officeLabel = "Office",
  officeDescription = "Drop by our office for a chat.",
  officeAddress = "38 The Chantry, Andover, SP10 1LZ",
  phoneLabel = "Phone",
  phoneDescription = "We're available Mon-Fri, 9am-5pm.",
  phone = "+440 126 452 7030",
  chatLabel = "Live Chat",
  chatDescription = "Get instant help from our support team.",
  chatLink = "Start Chat",
}) => {
  return (
    <section className="bg-background py-0">
      <div className="container">
        <div className="mb-14">
          <h1 className="mb-3 mt-2 text-balance text-3xl font-semibold md:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-100 rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
            <p className="text-muted-foreground mb-3">{emailDescription}</p>
            <a
              href={`mailto:${email}`}
              className="font-semibold hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="bg-white rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{officeLabel}</p>
            <p className="text-muted-foreground mb-3">{officeDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {officeAddress}
            </a>
          </div>
          <div className="bg-gray-100 lg:bg-white rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
            <p className="text-muted-foreground mb-3">{phoneDescription}</p>
            <Link
              href={`tel:${phone}`}
              className="font-semibold hover:underline"
            >
              {phone}
            </Link>
          </div>
          <div className="bg-white lg:bg-gray-100 rounded-lg p-6">
            <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
              <MessageCircle className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{chatLabel}</p>
            <p className="text-muted-foreground mb-3">{chatDescription}</p>
            <Link
              href="https://wa.me/447770939627"
              target="_blank"
              className="font-semibold hover:underline"
            >
              {chatLink}
            </Link>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export { ContactUs };
