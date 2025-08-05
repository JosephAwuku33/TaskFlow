import { Card, CardContent } from "@/components/ui/card";
import { TaskItem } from "./TaskItem";
import { CheckSquare } from "lucide-react";
import { type LocalTask } from "@/types";

interface TaskListProps {
  tasks: LocalTask[];
  isLoading: boolean;
  hasFilters: boolean;
  onEditTask: (task: LocalTask) => void;
  onDeleteTask: (id: number) => void;
}

export const TaskList = ({
  tasks,
  isLoading,
  hasFilters,
  onEditTask,
  onDeleteTask,
}: TaskListProps) => {
  if (isLoading) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p>Loading tasks...</p>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            {hasFilters
              ? "Try adjusting your search or filter criteria"
              : "Create your first task to get started"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};