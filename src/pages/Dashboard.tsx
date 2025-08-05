import { useState } from "react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { StatsCards } from "@/components/Dashboard/StatsCards";
import { TaskFilters } from "@/components/Dashboard/TaskFilters";
import { TaskList } from "@/components/Dashboard/TaskList";
import { TaskFormDialog } from "@/components/Dashboard/TaskFormDialog";
import { useAppSelector } from "../app/hooks";
import { useFetchTasks } from "../features/tasks/hooks";
import { useAuth } from "../features/auth/useAuth";
import { useNormalizedTasks } from "@/hooks/useNormalizedTasks";
import { useTaskCounts } from "@/hooks/useTaskCount";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { useTaskOperations } from "@/hooks/useTaskOperations";
import type { LocalTask, TaskFormValues } from "@/types";

const Dashboard = () => {
  // State management
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<LocalTask | null>(null);

  // Auth and data fetching
  const { user } = useAuth();
  const filterState = useAppSelector((s) => s.filter);
  const { data: remoteTasks = [], isLoading } = useFetchTasks();

  // Data transformation and filtering
  const normalizedTasks = useNormalizedTasks(remoteTasks);
  const filteredTasks = useFilteredTasks(normalizedTasks);
  const taskCounts = useTaskCounts(normalizedTasks);

  // Task operations
  const { handleCreate, handleUpdate, handleDelete } = useTaskOperations();

  // Dialog handlers
  const handleOpenCreateDialog = () => {
    setEditingTask(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditTask = (task: LocalTask) => {
    setEditingTask(task);
    setIsCreateDialogOpen(true);
  };

  const handleSubmitTask = (values: TaskFormValues) => {
    if (editingTask) {
      console.log(
        `This is the editingTask details ${editingTask.description} ${editingTask.title} ${editingTask.id}`
      );
      handleUpdate({
        id: editingTask.id,
        title: values.title,
        description: values.description || "",
        status: values.status,
        createdAt: editingTask.createdAt,
        updatedAt: new Date().toISOString(),
      });
    } else {
      handleCreate({
        title: values.title,
        description: values.description || "",
        status: values.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <DashboardHeader user={user ?? { username: "Guest" }} />

      <div className="container mx-auto px-4 py-8">
        <StatsCards counts={taskCounts} />

        <TaskFilters onOpenCreateDialog={handleOpenCreateDialog} />

        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          hasFilters={filterState.search !== "" || filterState.status !== "all"}
          onEditTask={handleEditTask}
          onDeleteTask={handleDelete}
        />
      </div>

      <TaskFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        task={editingTask}
        onSubmit={handleSubmitTask}
        isSubmitting={false} // Connect to mutation.isPending if needed
      />
    </div>
  );
};

export default Dashboard;
