import React, { Dispatch, SetStateAction } from "react";
import Modal from "@/components/common/Modal";
import { Inspection } from "@/types/inspection";
import FormSelect from "@/components/common/FormSelect";
import useGetProperties from "@/modules/properties/hooks/useGetProperties";
import useGetTemplates from "@/modules/templates/hooks/useGetTemplates";

export default function InspectionModal({
  isOpen,
  setIsOpen,
  inspection,
  setInspection,
  onSave,
  onCancel,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  inspection: Inspection;
  setInspection: Dispatch<SetStateAction<Inspection>>;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { data: templates } = useGetTemplates();
  const { data: properties } = useGetProperties();

  return (
    <Modal
      isOpen={isOpen}
      onOpen={setIsOpen}
      actionLabel="Create Inspection"
      title="Create New Inspection"
      description="Select a template and property to create a new inspection"
      saveButton={{
        label: "Create Inspection",
        onClick: onSave,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: onCancel,
      }}
    >
      <div className="space-y-4">
        <FormSelect
          label="Inspection Template"
          value={inspection.templateId}
          onChange={(value) =>
            setInspection((prev) => ({
              ...prev,
              templateId: value,
              templateName: templates?.find((t) => t._id === value)?.name ?? "",
            }))
          }
          placeholder="Select a template"
          options={
            templates?.map((template) => ({
              value: template._id!,
              label: template.name,
            })) ?? []
          }
          fullWidth
        />
        <FormSelect
          label="Property"
          value={inspection.propertyId}
          onChange={(value) =>
            setInspection((prev) => ({
              ...prev,
              propertyId: value,
              propertyName:
                properties?.find((p) => p._id === value)?.name ?? "",
            }))
          }
          placeholder="Select a property"
          options={
            properties?.map((property) => ({
              value: property._id!,
              label: property.name,
            })) ?? []
          }
          fullWidth
        />
      </div>
    </Modal>
  );
}
