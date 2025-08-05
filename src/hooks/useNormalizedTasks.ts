import { useMemo } from "react";
import type { Task } from "@/types";
import { type LocalTask } from "@/types";

export const useNormalizedTasks = (remoteTasks: Task[] = []): LocalTask[] => {
  return useMemo(() => {
    return remoteTasks.map((task) => ({
      id: task.id,
      title: task.todo,
      description: "",
      status: task.completed ? "done" : "todo", // Default to "todo" if not completed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }, [remoteTasks]);
};
