import React from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { questionTypeIcons } from "@/modules/templates/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Question, Template } from "@/types/template";

export default function QuestionsPreviewCard({
  template,
  onDelete,
}: {
  template: Template;
  onDelete: (q: Question) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Questions Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {template?.questions?.map((question, index) => {
            const IconComponent = questionTypeIcons[question.type];
            return (
              <div
                key={question._id ?? index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{question.text}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {question.type.replace("-", " ")}
                      </Badge>
                      {question.isRequired && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(question)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
