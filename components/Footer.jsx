import { footerLinks, socialLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <>
      <div className="w-full py-8 bg-primary text-muted-foreground">
        <div className="content px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center">
            <div className="quick links">
              <h3 className="text-sm font-bold ">Quick Links</h3>
              <ul>
                {footerLinks.map((link, idx) => (
                  <li>
                    <Link href={link.url}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cta hidden md:flex lg:block flex-col justify-center items-center">
              <h3 className="text-sm font-bold">
                🎉 Act Now & Start Saving! 🎉
              </h3>
              <Button variant="secondary" className="my-3">
                Join Now for Exclusive Travel Perks!
              </Button>
            </div>
            <div className="social max-w-[200px] lg:max-w-[400px]">
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
      <p className="text-center bg-primary border border-x-0 border-b-0 text-muted-foreground py-1">
        Bestravel &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </>
  );
};
export default Footer;
