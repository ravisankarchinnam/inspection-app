import { Inspection, InspectionStatus } from "@/types/inspection";
import { CheckCircle, Clock } from "lucide-react";

export const getStatusColor = (status: Inspection["status"]) => {
  switch (status) {
    case InspectionStatus.COMPLETED:
      return "bg-green-100 text-green-800";
    case InspectionStatus.IN_PROGRESS:
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusIcon = (status: Inspection["status"]) => {
  switch (status) {
    case InspectionStatus.COMPLETED:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case InspectionStatus.IN_PROGRESS:
      return <Clock className="h-4 w-4 text-blue-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};
