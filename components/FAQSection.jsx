import React from "react";
import Faq from "./ui/faq";
import { faqs } from "@/lib/data";
import Image from "next/image";

const FAQSection = () => {
  return (
    <div className="w-full py-12 ">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 ">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <h2 className="text-sm uppercase font-bold text-center mb-6">
              ❓ Frequently Asked Questions (FAQ
              <span className="lowercase">s</span>)
            </h2>
            <div className="faq bg-white p-6 rounded-md shadow max-w-[400px] mx-auto">
              {faqs.map((item, idx) => (
                <Faq
                  question={item.question}
                  answer={item.answer}
                  number={idx + 1}
                  key={idx}
                />
              ))}
              <p className="text-sm text-muted-foreground pt-6">
                Still have questions? Contact us below!
              </p>
            </div>
          </div>
          <div className="relative hidden my-5 p-2 bg-white rounded-lg shadow lg:flex items-center justify-center">
            <Image
              className="p-2 bg-white rounded-lg hover:scale-105 transform transition duration-300 ease-in-out"
              src="/images/hotels/2018_Pres_Suites_1.jpg"
              alt="Presidential Suite"
              // width={500}
              // height={500}
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
