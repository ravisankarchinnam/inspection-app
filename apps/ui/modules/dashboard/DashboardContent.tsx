import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Building,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import useGetTemplates from "@/modules/templates/hooks/useGetTemplates";
import useGetProperties from "@/modules/properties/hooks/useGetProperties";
import useGetInspections from "@/modules/inspections/hooks/useGetInspections";
import { getRecentActivity } from "@/modules/templates/utils";
import { InspectionStatus } from "@/types/inspection";
import { formatDistanceToNow } from "date-fns";
const Dashboard = () => {
  const { data: templates } = useGetTemplates();
  const { data: properties } = useGetProperties();
  const { data: inspections } = useGetInspections();

  const stats = {
    templates: templates?.length,
    properties: properties?.length,
    inspections: inspections?.length,
    completedInspections: inspections?.filter(
      (inspection) => inspection.status === InspectionStatus.COMPLETED
    )?.length,
    pendingInspections: inspections?.filter(
      (inspection) => inspection.status !== InspectionStatus.COMPLETED
    )?.length,
    recentActivity: getRecentActivity(templates, properties, inspections),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.templates}
            </div>
            <p className="text-xs text-muted-foreground">Active templates</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.properties}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered properties
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inspections
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.inspections}
            </div>
            <p className="text-xs text-muted-foreground">
              All time inspections
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {!stats.inspections
                ? 0
                : Math.round(
                    ((stats.completedInspections ?? 0) / stats.inspections) *
                      100
                  )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Inspections completed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Inspection Status</span>
            </CardTitle>
            <CardDescription>Current inspection progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Completed</span>
              </div>
              <Badge variant="secondary">{stats.completedInspections}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Pending</span>
              </div>
              <Badge variant="outline">{stats.pendingInspections}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`p-1 rounded-full ${
                      activity.type === "inspection"
                        ? "bg-blue-100"
                        : activity.type === "template"
                          ? "bg-green-100"
                          : "bg-purple-100"
                    }`}
                  >
                    {activity.type === "inspection" && (
                      <ClipboardList className="h-3 w-3 text-blue-600" />
                    )}
                    {activity.type === "template" && (
                      <FileText className="h-3 w-3 text-green-600" />
                    )}
                    {activity.type === "property" && (
                      <Building className="h-3 w-3 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.item}
                    </p>
                    {activity.time && (
                      <p className="text-xs text-muted-foreground">
                        {activity.action} • {formatDistanceToNow(activity.time)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
