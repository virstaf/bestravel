import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = ({ question, answer, number, className }) => {
  return (
    <Accordion type="single" collapsible className={className}>
      <AccordionItem value={number}>
        <AccordionTrigger className="text-lg">{question}</AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
