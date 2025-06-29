import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Plus } from "lucide-react";
import React from "react";

export default function EmptyResults({ onClick }: { onClick: () => void }) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No properties yet</h3>
        <p className="text-muted-foreground mb-4">
          Add your first property to start managing inspections
        </p>
        <Button onClick={onClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </CardContent>
    </Card>
  );
}
