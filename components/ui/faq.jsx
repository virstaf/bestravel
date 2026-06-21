import { memo } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Faq component memoized to prevent unnecessary re-renders in the FAQ accordion
 * when other parts of the page state change.
 */
const Faq = memo(({ question, answer, number }) => {
  return (
    <AccordionItem value={number}>
      <AccordionTrigger className="text-lg">{question}</AccordionTrigger>
      <AccordionContent className="text-gray-600 text-lg">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
});

Faq.displayName = "Faq";

export default Faq;
