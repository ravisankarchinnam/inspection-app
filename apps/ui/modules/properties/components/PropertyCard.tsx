import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Address, Property } from "@/types/property";
import { Building, Edit, MapPin, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatAddress = (address: Address) => {
  return `${address.number} ${address.street}, ${address.city} ${address.postalCode}`.trim();
};

export default function PropertyCard({
  property,
  onDelete,
}: {
  property: Property;
  onDelete: () => void;
}) {
  const { _id, name, address, createdAt } = property;

  return (
    <Card key={_id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{formatAddress(address)}</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Inspections</span>
            {/* <Badge
                    variant={
                      inspectionCount > 0 ? "default" : "secondary"
                    }
                  >
                    {inspectionCount}
                  </Badge> */}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Added</span>
            <span className="text-sm">
              <Tooltip>
                <TooltipTrigger>
                  {formatDistanceToNow(new Date(createdAt!))}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{createdAt}</p>
                </TooltipContent>
              </Tooltip>
            </span>
          </div>

          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full">
              Create Inspection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
