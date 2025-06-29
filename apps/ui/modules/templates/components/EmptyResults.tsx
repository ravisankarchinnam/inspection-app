import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmptyResults({ onClick }: { onClick: () => void }) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No templates yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first inspection template to get started
        </p>
        <Button onClick={onClick}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </CardContent>
    </Card>
  );
}
