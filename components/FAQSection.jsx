
import Faq from "./ui/faq";
import { faqs } from "@/lib/data";
import { Accordion } from "./ui/accordion";

const FAQSection = () => {
  return (
    <div className="w-full py-12 " id="faq-section">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 ">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Frequently Asked Questions (FAQ
            <span className="lowercase">s</span>)
          </h2>
        </div>
        <div className="w-full mx-auto">
          <div>
            <div className="faq bg-white p-6 rounded-md shadow w-full mx-auto">
              <Accordion collapsible defaultValue={1} className="mb-4 border-b last:border-0 text-gray-600">
              {faqs.map((item, idx) => (
                <Faq
                  className="mb-4 border-b last:border-0 text-gray-600"
                  question={item.question}
                  answer={item.answer}
                  number={idx + 1}
                  key={idx}
                />
              ))}</Accordion>
              <p className="text-sm text-muted-foreground pt-6">
                Still have questions? Contact us below!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
