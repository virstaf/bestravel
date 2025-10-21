import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = ({ question, answer, number }) => {
  return (
    <AccordionItem value={number}>
      <AccordionTrigger className="text-lg">{question}</AccordionTrigger>
      <AccordionContent className="text-gray-600 text-lg">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Faq;
