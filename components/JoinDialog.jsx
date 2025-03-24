import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import WaitingListForm from "./ui/waitingListForm";

export function JoinDialog({ ButtonText, Variant }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={Variant || "default"}>{ButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="font-bold text-center my-4">
          Join VIP Waiting
        </DialogTitle>
        <WaitingListForm />
      </DialogContent>
    </Dialog>
  );
}
