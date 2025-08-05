import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/axios";
import type { Task } from "@/types";
import { store } from "@/app/store";

// Define the type for the context returned by onMutate
interface MutationContext<TPrevious> {
  previous: TPrevious;
}

// Dynamic query key based on userId
const getTasksQueryKey = () => {
  const userId = store.getState().auth.user?.id;
  return userId ? ["tasks", userId] : ["tasks"];
};

/**
 * Custom hook to fetch all tasks for the current user
 */
export const useFetchTasks = () => {
  const userId = store.getState().auth.user?.id;

  return useQuery<Task[]>({
    queryKey: getTasksQueryKey(),
    queryFn: async () => {
      if (!userId) throw new Error("User not authenticated");
      const res = await api.get(`todos/user/${userId}`);
      return res.data.todos as Task[];
    },
    enabled: !!userId, // Only fetch if userId exists
  });
};

/**
 * Custom hook to add a new task with optimistic updates
 */
export const useAddTask = () => {
  const queryClient = useQueryClient();
  const userId = store.getState().auth.user?.id;

  return useMutation<Task, Error, Partial<Task>, MutationContext<Task[]>>({
    mutationFn: async (newTask) => {
      if (!userId) throw new Error("User not authenticated");
      if (!newTask.todo?.trim()) throw new Error("Task title cannot be empty");

      const res = await api.post("/todos/add", {
        todo: newTask.todo.trim(),
        completed: newTask.completed || false,
        userId,
      });
      return res.data as Task;
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: getTasksQueryKey() });

      const previousTasks =
        queryClient.getQueryData<Task[]>(getTasksQueryKey()) || [];

      const optimisticTask: Task = {
        id: -Date.now(), // Temporary unique ID (negative to avoid collision)
        todo: newTask.todo || "",
        completed: newTask.completed || false,
        userId: userId!,
      };

      queryClient.setQueryData<Task[]>(getTasksQueryKey(), (old = []) => [
        optimisticTask,
        ...old,
      ]);

      return { previous: previousTasks };
    },
    onError: (err, _newTask, context) => {
      if (context?.previous) {
        queryClient.setQueryData(getTasksQueryKey(), context.previous);
      }
      console.error(`Failed to add task: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey() });
    },
  });
};

/**
 * Custom hook to update an existing task with optimistic updates
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task, MutationContext<Task[]>>({
    mutationFn: async (task) => {
      if (!task.todo?.trim()) throw new Error("Task title cannot be empty");

      // Ensure ID is treated as number
      const taskId = Number(task.id);
      if (isNaN(taskId)) throw new Error("Invalid task ID");

      const res = await api.patch(`/todos/${taskId}`, {
        todo: task.todo,
        completed: task.completed,
        // Don't send the entire task object, only what DummyJSON expects
      });
      return res.data as Task;
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: getTasksQueryKey() });

      const previousTasks =
        queryClient.getQueryData<Task[]>(getTasksQueryKey()) || [];

      queryClient.setQueryData<Task[]>(getTasksQueryKey(), (old = []) =>
        old.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
      );

      return { previous: previousTasks };
    },
    onError: (err, _updatedTask, context) => {
      if (context?.previous) {
        queryClient.setQueryData(getTasksQueryKey(), context.previous);
      }
      console.error(`Failed to update task: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey() });
    },
  });
};

/**
 * Custom hook to delete a task with optimistic updates
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, MutationContext<Task[]>>({
    mutationFn: async (id) => {
      await api.delete(`/todos/${id}`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: getTasksQueryKey() });

      const previousTasks =
        queryClient.getQueryData<Task[]>(getTasksQueryKey()) || [];

      queryClient.setQueryData<Task[]>(getTasksQueryKey(), (old = []) =>
        old.filter((t) => t.id !== id)
      );

      return { previous: previousTasks };
    },
    onError: (err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(getTasksQueryKey(), context.previous);
      }
      console.error(`Failed to delete task: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey() });
    },
  });
};
