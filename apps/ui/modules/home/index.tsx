"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Building,
  ClipboardList,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Dashboard from "@/modules/dashboard/DashboardContent";
import TemplateManager from "@/modules/templates/TemplateContent";
import PropertyManager from "@/modules/properties/PropertyContent";
import InspectionManager from "@/modules/inspections/InspectionContent";

const HomePageContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Inspection Manager
              </h1>
              <p className="text-lg text-gray-600">
                Manage templates, properties, and inspections efficiently
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="px-3 py-1">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(), "MM/dd/yyyy")}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="flex items-center space-x-2"
            >
              <Building className="w-4 h-4" />
              <span>Properties</span>
            </TabsTrigger>
            <TabsTrigger
              value="inspections"
              className="flex items-center space-x-2"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Inspections</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateManager />
          </TabsContent>

          <TabsContent value="properties">
            <PropertyManager />
          </TabsContent>

          <TabsContent value="inspections">
            <InspectionManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePageContent;
