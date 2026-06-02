import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditDataPointForm } from "@/components/forms/EditDataPointForm";

interface EditDataPointDialogProps {
  className?: string;
}

export const EditDataPointDialog = ({
  className,
}: EditDataPointDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Plus className="size-4" />
          Edit data point
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Edit data point
          </DialogTitle>
        </DialogHeader>
        <EditDataPointForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
