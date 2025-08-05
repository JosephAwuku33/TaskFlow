import { useMemo } from "react";
import type { LocalTask } from "@/types";
import { useAppSelector } from "../app/hooks";

export const useFilteredTasks = (tasks: LocalTask[]) => {
  const filterState = useAppSelector((s) => s.filter);

  return useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        filterState.search.trim() === "" ||
        task.title.toLowerCase().includes(filterState.search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(filterState.search.toLowerCase());

      const matchesStatus =
        filterState.status === "all" || task.status === filterState.status;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, filterState]);
};
