import {
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from "../features/tasks/hooks";
import { toast } from "sonner";
import type { LocalTask } from "@/types";

export const useTaskOperations = () => {
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleCreate = (task: Omit<LocalTask, "id">) => {
    addTask.mutate(
      {
        todo: task.title,
        completed: task.status === "done", // Only "done" is considered completed
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
        },
        onError: () => {
          toast.error("Failed to create task");
        },
      }
    );
  };

  const handleUpdate = (task: LocalTask) => {
    updateTask.mutate(
      {
        id: Number(task.id),
        todo: task.title,
        completed: task.status === "done", // Only "done" is considered completed
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
        },
        onError: () => {
          toast.error("Failed to update task");
        },
      }
    );
  };
  
  const handleDelete = (id: number) => {
    deleteTask.mutate(id, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  return { handleCreate, handleUpdate, handleDelete };
};
