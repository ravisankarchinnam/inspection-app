import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Inspection, InspectionStatus } from "@/types/inspection";
import useGetInspections from "@/modules/inspections/hooks/useGetInspections";
import { DEFAULT_INSPECTION } from "@/modules/inspections/constants";
import EmptyResults from "@/modules/inspections/components/EmptyResults";
import InspectionQNAModal from "@/modules/inspections/components/InspectionQNAModal";
import useCreateInspection from "@/modules/inspections/hooks/useCreateInspection";
import InspectionCard from "@/modules/inspections/components/InspectionCard";
import InspectionModal from "@/modules/inspections/components/InspectionModal";
import { useUpdateInspectionStatus } from "@/modules/inspections/hooks/useUpdateInspectionStatus";

const InspectionManager = () => {
  const { data } = useGetInspections();
  const { mutate: create } = useCreateInspection();
  const { mutate: changeStatus } = useUpdateInspectionStatus();
  const [inspections, setInspections] = useState<Inspection[]>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection>();
  const [newInspection, setNewInspection] =
    useState<Inspection>(DEFAULT_INSPECTION);

  const createInspection = () => {
    if (!newInspection.templateId || !newInspection.propertyId) {
      toast.error("Please select both template and property");
      return;
    }

    create(newInspection);
    setNewInspection(DEFAULT_INSPECTION);
    setIsCreateDialogOpen(false);
    toast.success("Inspection created successfully");
  };

  const updateInspectionStatus = (id: string, status: InspectionStatus) => {
    changeStatus({ id, status });
    toast.success(`Inspection marked as ${status}`);
  };

  const viewInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsViewDialogOpen(true);
  };

  useEffect(() => {
    setInspections(data ?? []);
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inspection Management</h2>
          <p className="text-muted-foreground">
            Create, manage, and track property inspections
          </p>
        </div>
        <InspectionModal
          isOpen={isCreateDialogOpen}
          setIsOpen={setIsCreateDialogOpen}
          inspection={newInspection}
          setInspection={setNewInspection}
          onSave={createInspection}
          onCancel={() => setIsCreateDialogOpen(false)}
        />
      </div>

      {/* Inspections List */}
      <div className="space-y-4">
        {inspections?.map((inspection) => (
          <InspectionCard
            key={inspection?._id}
            inspection={inspection}
            onView={viewInspection}
            onUpdate={updateInspectionStatus}
          />
        ))}
      </div>

      {/* View Inspection Dialog */}
      <InspectionQNAModal
        inspection={selectedInspection}
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
      />

      {inspections?.length === 0 && (
        <EmptyResults onClick={() => setIsCreateDialogOpen(true)} />
      )}
    </div>
  );
};

export default InspectionManager;
