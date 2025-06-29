import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Template } from "@/types/template";
import { questionTypeIcons } from "@/modules/templates/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

export default function TemplateCard({
  template,
  onEdit,
  onDelete,
}: {
  template: Template;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { _id, name, description, questions, createdAt } = template;
  return (
    <Card key={_id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={onEdit}>
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
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Questions</span>
            <Badge variant="secondary">{questions?.length}</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Created</span>
            <Tooltip>
              <TooltipTrigger>
                {formatDistanceToNow(new Date(createdAt!))}
              </TooltipTrigger>
              <TooltipContent>
                <p>{createdAt}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-wrap gap-1">
            {questions?.slice(0, 3).map((question) => {
              const IconComponent = questionTypeIcons[question.type];
              return (
                <Badge key={question._id} variant="outline" className="text-xs">
                  <IconComponent className="h-3 w-3 mr-1" />
                  {question.type.replace("-", " ")}
                </Badge>
              );
            })}
            {questions?.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{questions?.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
