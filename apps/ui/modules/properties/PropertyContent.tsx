import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/modules/properties/components/PropertyCard";
import PropertyModal from "@/modules/properties/components/PropertyModal";
import EmptyResults from "@/modules/properties/components/EmptyResults";
import useGetProperties from "@/modules/properties/hooks/useGetProperties";
import { Property } from "@/types/property";
import useCreateProperty from "./hooks/useCreateProperty";
import useDeleteProperty from "./hooks/useDeleteProperty";

const PropertyContent = () => {
  const { data } = useGetProperties();
  const { mutate: create } = useCreateProperty();
  const { mutate: remove } = useDeleteProperty();
  const [properties, setProperties] = useState<Property[]>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: {
      street: "",
      number: "",
      city: "",
      postalCode: "",
    },
  });

  const createProperty = () => {
    if (
      !newProperty.name.trim() ||
      !newProperty.address.street.trim() ||
      !newProperty.address.city.trim() ||
      !newProperty.address.postalCode.trim()
    ) {
      toast.error("Name, street, city and postal code are required");
      return;
    }

    create(newProperty);
    setNewProperty({
      name: "",
      address: {
        street: "",
        number: "",
        city: "",
        postalCode: "",
      },
    });
    setIsCreateDialogOpen(false);
    toast.success("Property created successfully");
  };

  const deleteProperty = (id: string) => {
    remove(id);
    toast.success("Property deleted successfully");
  };

  useEffect(() => {
    setProperties(data ?? []);
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-muted-foreground">
            Manage your inspection properties and locations
          </p>
        </div>
        <PropertyModal
          isOpen={isCreateDialogOpen}
          setIsOpen={setIsCreateDialogOpen}
          property={newProperty}
          setNewProperty={setNewProperty}
          onSave={createProperty}
          onCancel={() => setIsCreateDialogOpen(false)}
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onDelete={() => deleteProperty(property._id!)}
          />
        ))}
      </div>

      {properties.length === 0 && (
        <EmptyResults onClick={() => setIsCreateDialogOpen(true)} />
      )}
    </div>
  );
};

export default PropertyContent;
