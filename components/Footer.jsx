import { footerLinks, socialLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { JoinDialog } from "./JoinDialog";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full py-8 bg-primary text-muted-foreground">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center">
            <div className="quick links">
              <h3 className="text-sm font-bold ">Quick Links</h3>
              <ul>
                {footerLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.url}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cta hidden md:flex lg:block flex-col justify-center items-center">
              <h3 className="text-sm font-bold">
                🎉 Act Now & Start Saving! 🎉
              </h3>
              <div className="my-3">
                <JoinDialog
                  ButtonText={"Join Now for Exclusive Travel Perks!"}
                  Variant={"outline"}
                />
              </div>
            </div>
            <div className="social max-w-[200px] lg:max-w-[400px]">
              <h3 className="text-sm font-bold ">Follow Us on Social Media</h3>
              <div className="Socials flex gap-3 my-3">
                {socialLinks.map((item, idx) => (
                  <Link key={idx} href={item.url} target="_blank">
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
      <div className="flex justify-evenly flex-wrap gap-2 text-sm text-center bg-primary border border-x-0 border-b-0 text-muted-foreground px-4 py-1">
        <p className="">
          Virstravel &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <Link href="https://uniiktheo.tech" target="_blank">
          <p className="ml-2">Powered by Virstaf</p>
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
