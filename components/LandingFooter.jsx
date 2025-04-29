import { socialLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingFooter = () => {
  return (
    <footer className="w-full">
      <div className="w-full py-8 bg-slate-900 text-(--muted)">
        <div className="container flex flex-row-reverse flex-wrap justify-between items-center mx-auto px-4 md:px-8 lg:px-12">
          <div className="Socials flex gap-3 my-3">
            {socialLinks.map((item, idx) => (
              <Link key={idx} href={item.url} target="_blank">
                <Image src={item.icon} width={24} height={24} alt={item.name} />
              </Link>
            ))}
          </div>
          <div className="">
            <p className="">
              <Link
                href="https://virstaf.com/"
                target="_blank"
                className="hover:text-secondary"
              >
                Virstaf
              </Link>{" "}
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <Link
              href="https://uniiktheo.tech"
              target="_blank"
              className="hover:text-secondary"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
