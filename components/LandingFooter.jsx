import { socialLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingFooter = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-500">
      <div className="w-full max-w-7xl mx-auto py-8 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto px-4 md:px-8 lg:px-12">
          <div className="">
            <p className="">
              All Right Reserved &copy; {new Date().getFullYear()}{" "}
              <Link
                href="https://virstaf.com/"
                target="_blank"
                className="hover:text-secondary"
              >
                Virstaf LTD
              </Link>
            </p>
            <p>
              Chantry House, IncuHive Space, <br />
              38 The Chantry, Andover, SP10 1LZ
            </p>
          </div>
          <div className="">
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
            <div className="">
              <Link href="/privacy-policy" className="hover:text-secondary">
                Privacy Policy
              </Link>
              <span className="mx-2">|</span>
              <Link href="/terms-of-service" className="hover:text-secondary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
