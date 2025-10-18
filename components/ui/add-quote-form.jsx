import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import QuoteBuilder from "../QuoteBuilder";

const AddQuoteForm = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Add Quote</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill to Add Quote</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <QuoteBuilder />
      </DialogContent>
    </Dialog>
  );
};

export default AddQuoteForm;
