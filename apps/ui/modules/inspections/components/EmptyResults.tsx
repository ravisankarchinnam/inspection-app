import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Plus } from "lucide-react";

export default function EmptyResults({ onClick }: { onClick: () => void }) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No inspections yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first inspection to get started
        </p>
        <Button onClick={onClick}>
          <Plus className="h-4 w-4 mr-2" />
          Create Inspection
        </Button>
      </CardContent>
    </Card>
  );
}
