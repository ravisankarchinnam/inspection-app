import { Inspection, InspectionStatus } from "@/types/inspection";
import { Property } from "@/types/property";
import { Template } from "@/types/template";

export const getRecentActivity = (
  templates?: Template[],
  properties?: Property[],
  inspections?: Inspection[]
) => {
  const activity = [];

  if (templates?.length) {
    activity.push({
      type: "template",
      action: "created",
      item: templates[0].name,
      time: templates[0].createdAt,
    });
  }

  if (properties?.length) {
    activity.push({
      type: "property",
      action: "added",
      item: properties[0].name,
      time: properties[0].createdAt,
    });
  }

  if (inspections?.length) {
    const completedInspection = inspections.find(
      (inspection) => inspection.status === InspectionStatus.COMPLETED
    );
    const startInspection = inspections.find(
      (inspection) => inspection.status === InspectionStatus.PENDING
    );

    if (completedInspection) {
      activity.push({
        type: "inspection",
        action: "completed",
        item: `${completedInspection.templateName} - ${completedInspection.propertyName}`,
        time: completedInspection.updatedAt,
      });
    }

    if (startInspection) {
      activity.push({
        type: "inspection",
        action: "started",
        item: `${startInspection.templateName} - ${startInspection.propertyName}`,
        time: startInspection.createdAt,
      });
    }
  }

  return activity;
};
