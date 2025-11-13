import Link from "next/link";
import ContactForm from "./ui/contactForm";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import whatsappIcon from "../public/socials/whatsapp-black.svg";
import Image from "next/image";
import { ContactUs } from "./contact7";

const GetInTouch = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <ContactUs />
    </div>
  );
};

export default GetInTouch;
