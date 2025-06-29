import React, { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
  isOpen?: boolean;
  onOpen: (value: boolean) => void;
  actionLabel: string;
  title: string;
  description: string;
  children: ReactNode;
  saveButton: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  cancelButton: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
};

export default function Modal({
  isOpen,
  onOpen,
  title,
  description,
  children,
  actionLabel,
  saveButton,
  cancelButton,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>{actionLabel}</span>
        </Button>
      </DialogTrigger>
      {/* <DialogContent className="sm:max-w-[425px]"> */}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={cancelButton.onClick}
              disabled={cancelButton.disabled}
            >
              {cancelButton.label}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={saveButton.onClick}
            disabled={saveButton.disabled}
          >
            {saveButton.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
