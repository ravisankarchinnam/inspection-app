import React, { Dispatch, SetStateAction, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Modal from "@/components/common/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import { Question, Template, TemplateType } from "@/types/template";
import QuestionsPreviewCard from "@/modules/templates/components/QuestionsPreviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function TemplateModal({
  template,
  setNewTemplate,
  isOpen,
  setIsOpen,
  onSave,
  onUpdate,
  onCancel,
  isLoading,
}: {
  template: Template;
  setNewTemplate: Dispatch<SetStateAction<Template>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSave: () => void;
  onUpdate: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  const [newQuestion, setNewQuestion] = useState<Question>({
    type: TemplateType.STRING,
    text: "",
    isRequired: false,
    options: [],
  });

  const addQuestion = () => {
    if (!newQuestion?.text.trim()) {
      toast.error("Question text is required");
      return;
    }

    const question: Question = {
      type: newQuestion?.type,
      text: newQuestion?.text,
      isRequired: newQuestion?.isRequired,
      ...([TemplateType.SINGLE, TemplateType.MULTI].includes(
        newQuestion?.type
      ) && {
        options: newQuestion?.options?.filter((opt) => !!opt.trim()),
      }),
    };

    setNewTemplate((prev) => ({
      ...(prev ?? ({} as Template)),
      questions: [...(prev?.questions ?? []), question],
    }));

    setNewQuestion({
      type: TemplateType.STRING,
      text: "",
      isRequired: false,
      options: [],
    });

    toast.success("Question added successfully");
  };

  const removeQuestion = (questionId: string) => {
    setNewTemplate((prev) => ({
      ...(prev ?? ({} as Template)),
      questions: prev?.questions?.filter((q) => q._id !== questionId),
    }));
  };

  const addOption = () => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...(prev?.options ?? []), ""],
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options?.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpen={setIsOpen}
      actionLabel="Create Template"
      title="Create New Template"
      description="Build a custom inspection template with various question types"
      saveButton={{
        label: template._id ? "Update" : "Create",
        onClick: template._id ? onUpdate : onSave,
        disabled: isLoading,
      }}
      cancelButton={{
        label: "Cancel",
        onClick: onCancel,
        disabled: isLoading,
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Template Name"
            name="template-name"
            value={template?.name}
            onChange={(e) =>
              setNewTemplate((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="e.g., Safety Inspection"
            disabled={!!template._id || isLoading}
          />
          <FormInput
            label="Description"
            name="template-description"
            value={template?.description}
            onChange={(e) =>
              setNewTemplate((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Brief description of this template"
            disabled={!!template._id || isLoading}
          />
        </div>

        {/* Add Question Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                label="Question Type"
                value={newQuestion?.type ?? ""}
                onChange={(value) =>
                  setNewQuestion((prev) => ({
                    ...prev,
                    type: value as Question["type"],
                  }))
                }
                placeholder="Select a template"
                options={[
                  { label: "Text Input", value: TemplateType.STRING },
                  { label: "Number Input", value: TemplateType.NUMBER },
                  { label: "Date Input", value: TemplateType.DATE },
                  { label: "Single Choice", value: TemplateType.SINGLE },
                  { label: "Multiple Choice", value: TemplateType.MULTI },
                ]}
                disabled={isLoading}
              />
              <FormInput
                label="Question Text"
                name="question-text"
                value={newQuestion?.text}
                onChange={(e) =>
                  setNewQuestion((prev) => ({
                    ...prev,
                    text: e.target.value,
                  }))
                }
                placeholder="Enter your question"
                disabled={isLoading}
              />
            </div>

            {newQuestion?.type &&
              [TemplateType.SINGLE, TemplateType.MULTI].includes(
                newQuestion?.type
              ) && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {newQuestion?.options?.map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          disabled={isLoading}
                        />
                        {(newQuestion?.options?.length ?? 0) > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption(index)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

            <Button
              onClick={addQuestion}
              className="w-full"
              disabled={isLoading}
            >
              Add Question
            </Button>
          </CardContent>
        </Card>

        {/* Questions Preview */}
        {template?.questions?.length ? (
          <QuestionsPreviewCard
            template={template}
            onDelete={(question) => removeQuestion(question._id!)}
          />
        ) : null}
      </div>
    </Modal>
  );
}
