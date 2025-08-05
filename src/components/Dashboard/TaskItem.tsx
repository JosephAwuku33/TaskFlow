import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type LocalTask } from "@/types";

interface TaskItemProps {
  task: LocalTask;
  onEdit: (task: LocalTask) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  const statusBadgeVariants = {
    todo: "status-todo",
    "in progress": "status-progress", // Changed from 'progress' to 'in progress'
    done: "status-done",
  };

  const statusLabels = {
    todo: "To Do",
    "in progress": "In Progress", // Changed from 'progress' to 'in progress'
    done: "Done",
  };

  return (
    <Card key={task.id} className="card-elevated">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              {task.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {task.description || "No description"}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Badge 
              className={statusBadgeVariants[task.status]} 
              variant="secondary"
            >
              {statusLabels[task.status]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Updated {new Date(task.updatedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};