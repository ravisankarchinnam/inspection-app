import React, { Dispatch, SetStateAction } from "react";
import FormInput from "@/components/common/FormInput";
import Modal from "@/components/common/Modal";
import { Property } from "@/types/property";

export default function PropertyModal({
  isOpen,
  setIsOpen,
  property,
  setNewProperty,
  onSave,
  onCancel,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  property: Property;
  setNewProperty: Dispatch<SetStateAction<Property>>;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpen={setIsOpen}
      actionLabel="Add Property"
      title="Add New Property"
      description="Enter the property details for inspection management"
      saveButton={{
        label: "Add Property",
        onClick: onSave,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: onCancel,
      }}
    >
      <div className="space-y-4">
        <FormInput
          label="Property Name"
          name="property-name"
          value={property.name}
          onChange={(e) =>
            setNewProperty((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          placeholder="e.g., Building A, Office Complex"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Street"
            name="street"
            value={property.address.street}
            onChange={(e) =>
              setNewProperty((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  street: e.target.value,
                },
              }))
            }
            placeholder="Main Street"
          />
          <FormInput
            label="Number"
            name="number"
            value={property.address.number}
            onChange={(e) =>
              setNewProperty((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  number: e.target.value,
                },
              }))
            }
            placeholder="123"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="City"
            name="city"
            value={property.address.city}
            onChange={(e) =>
              setNewProperty((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  city: e.target.value,
                },
              }))
            }
            placeholder="Springfield"
          />
          <FormInput
            label="Postal Code"
            name="postal-code"
            value={property.address.postalCode}
            onChange={(e) =>
              setNewProperty((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  postalCode: e.target.value,
                },
              }))
            }
            placeholder="12345"
          />
        </div>
      </div>
    </Modal>
  );
}
