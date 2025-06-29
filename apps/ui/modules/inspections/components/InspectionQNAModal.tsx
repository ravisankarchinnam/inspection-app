import React, { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Inspection } from "@/types/inspection";
import { getStatusColor } from "@/modules/inspections/utils";
import useGetTemplate from "@/modules/templates/hooks/useGetTemplate";
import { InspectionQNAForm } from "@/modules/inspections/components/InspectionQNAForm";
import useUpdateInspection from "../hooks/useUpdateInspection";
import { formatDistanceToNow } from "date-fns";

type InspectionQNAModalProps = {
  inspection?: Inspection;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function InspectionQNAModal({
  inspection,
  isOpen,
  setIsOpen,
}: InspectionQNAModalProps) {
  const { data: template } = useGetTemplate(inspection?.templateId);
  const { mutate: update } = useUpdateInspection({
    onSuccess: () => setIsOpen(false),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Inspection Details</DialogTitle>
          <DialogDescription>
            {inspection &&
              `${inspection.templateName} - ${inspection.propertyName}`}
          </DialogDescription>
        </DialogHeader>
        {inspection && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Badge className={`${getStatusColor(inspection.status)} mt-1`}>
                  {inspection.status}
                </Badge>
              </div>
              {inspection.createdAt && (
                <div>
                  <Label>Created Date</Label>
                  <p className="text-sm mt-1">
                    {formatDistanceToNow(inspection.createdAt)}
                  </p>
                </div>
              )}
            </div>

            {template && (
              <InspectionQNAForm
                template={template}
                inspection={inspection}
                onSubmit={(answers) => update({ id: inspection._id!, answers })}
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
