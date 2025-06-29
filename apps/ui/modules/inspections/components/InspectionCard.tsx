import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatusColor, getStatusIcon } from "@/modules/inspections/utils";
import { Inspection, InspectionStatus } from "@/types/inspection";
import { Building, Calendar, CheckCircle, ClipboardList } from "lucide-react";

export default function InspectionCard({
  inspection,
  onView,
  onUpdate,
}: {
  inspection: Inspection;
  onView: (inspection: Inspection) => void;
  onUpdate: (id: string, status: InspectionStatus) => void;
}) {
  return (
    <Card key={inspection._id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClipboardList className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>{inspection.templateName}</span>
                <Badge
                  className={`text-xs ${getStatusColor(inspection.status)}`}
                >
                  {inspection.status?.replace("_", " ")}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center space-x-4 mt-1">
                <span className="flex items-center space-x-1">
                  <Building className="h-3 w-3" />
                  <span>{inspection.propertyName}</span>
                </span>
                {inspection.createdAt && (
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Created: {formatDistanceToNow(inspection.createdAt)}
                    </span>
                  </span>
                )}
                {inspection.updatedAt && (
                  <span className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>
                      Completed: {formatDistanceToNow(inspection.updatedAt)}
                    </span>
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(inspection.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(inspection)}
            >
              View Details
            </Button>
            {inspection.status === InspectionStatus.PENDING && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onUpdate(inspection._id!, InspectionStatus.IN_PROGRESS)
                }
              >
                Start Inspection
              </Button>
            )}
            {inspection.status === InspectionStatus.IN_PROGRESS && (
              <Button
                size="sm"
                onClick={() =>
                  onUpdate(inspection._id!, InspectionStatus.COMPLETED)
                }
              >
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
