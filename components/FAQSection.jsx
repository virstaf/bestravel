import React from "react";
import Faq from "./ui/faq";
import { faqs } from "@/lib/data";

const FAQSection = () => {
  return (
    <div className="w-full py-8 border bg-gray-200">
      <div className="content px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-sm uppercase font-bold text-center mb-6">
          ❓ Frequently Asked Questions (FAQ
          <span className="lowercase">s</span>)
        </h2>
        <div className="faq max-w-[400px] mx-auto">
          {faqs.map((item, idx) => (
            <Faq
              question={item.question}
              answer={item.answer}
              number={idx + 1}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
