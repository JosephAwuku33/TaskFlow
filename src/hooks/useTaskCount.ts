import { useMemo } from "react";
import type { LocalTask } from "@/types";

export const useTaskCounts = (tasks: LocalTask[]) => {
  return useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      progress: tasks.filter((t) => t.status === "in progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks]
  );
};
