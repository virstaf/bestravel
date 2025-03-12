import { socialLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <>
      <div className="w-full py-8 bg-primary text-muted-foreground">
        <div className="content px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="links">
              <h3 className="text-sm font-bold ">Quick Links</h3>
              <ul>
                <li>
                  <Link href="/about">About Us</Link>
                </li>

                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="cta">
              <h3 className="text-sm font-bold">
                🎉 Act Now & Start Saving! 🎉
              </h3>
              <Button variant="secondary" className="my-3">
                Join Now for Exclusive Travel Perks!
              </Button>
            </div>
            <div className="social max-w-[400px]">
              <h3 className="text-sm font-bold ">Follow Us on Social Media</h3>
              <div className="Socials flex gap-3 my-3">
                {socialLinks.map((item, idx) => (
                  <Link key={idx} href={item.url}>
                    <Image
                      src={item.icon}
                      width={24}
                      height={24}
                      alt={item.name}
                    />
                  </Link>
                ))}
              </div>
              <p>
                📢 Follow us for travel inspiration, exclusive promotions, and
                more!
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center bg-gray-200 ">
        All rights reserved. &copy; {new Date().getFullYear()}
      </p>
    </>
  );
};
export default Footer;
