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

const tabs = [
  { value: "dashboard", label: "Dashboard", icon: TrendingUp },
  { value: "templates", label: "Templates", icon: FileText },
  { value: "properties", label: "Properties", icon: Building },
  { value: "inspections", label: "Inspections", icon: ClipboardList },
];

const HomePageContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-2">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-scroll">
            <TabsList className="flex flex-row justify-stretch w-full mb-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center space-x-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

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
