import { memo } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Faq component optimized with React.memo.
 * Prevents unnecessary re-renders when other parts of the FAQ section update.
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
