import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Template } from "@/types/template";
import useCreateTemplate from "@/modules/templates/hooks/useCreateTemplate";
import useDeleteTemplate from "@/modules/templates/hooks/useDeleteTemplate";
import useGetTemplates from "@/modules/templates/hooks/useGetTemplates";
import EmptyResults from "@/modules/templates/components/EmptyResults";
import TemplateCard from "@/modules/templates/components/TemplateCard";
import TemplateModal from "@/modules/templates/components/TemplateModal";
import { useUpdateTemplate } from "@/modules/templates/hooks/useUpdateTemplate";

const TemplateContent = () => {
  const { data } = useGetTemplates();
  const { mutate: create, isPending: isCreateLoading } = useCreateTemplate();
  const { mutate: update, isPending: isUpdateLoading } = useUpdateTemplate();
  const { mutate: remove } = useDeleteTemplate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Template>({
    name: "",
    description: "",
    questions: [],
  });
  const createTemplate = () => {
    if (!newTemplate?.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (newTemplate?.questions?.length === 0) {
      toast.error("At least one question is required");
      return;
    }

    const template: Template = {
      name: newTemplate.name,
      description: newTemplate.description,
      questions: newTemplate.questions,
    };

    create(template);
    setNewTemplate({ name: "", description: "", questions: [] });
    setIsDialogOpen(false);
    toast.success("Template created successfully");
  };

  const updateTemplate = () => {
    if (!newTemplate?._id) {
      toast.error("Template Id is required for update");
      return;
    }
    if (!newTemplate?.name.trim()) {
      toast.error("Template name is required");
      return;
    }
    if (newTemplate?.questions?.length === 0) {
      toast.error("At least one question is required");
      return;
    }
    update({
      _id: newTemplate._id,
      questions: newTemplate.questions,
    });
    setNewTemplate({ name: "", description: "", questions: [] });
    setIsDialogOpen(false);
    toast.success("Template updated successfully");
  };

  const deleteTemplate = (id: string) => {
    remove(id);
    toast.success("Template deleted successfully");
  };

  useEffect(() => {
    setTemplates(data ?? []);
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-end gap-2 justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Inspection Templates</h2>
          <p className="text-muted-foreground">
            Create and manage inspection questionnaires
          </p>
        </div>
        <TemplateModal
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          template={newTemplate}
          setNewTemplate={setNewTemplate}
          onSave={createTemplate}
          onUpdate={updateTemplate}
          onCancel={() => setIsDialogOpen(false)}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template._id}
            template={template}
            onDelete={() => deleteTemplate(template._id!)}
            onEdit={() => {
              setNewTemplate(template);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>

      {templates.length === 0 && (
        <EmptyResults onClick={() => setIsDialogOpen(true)} />
      )}
    </div>
  );
};

export default TemplateContent;
