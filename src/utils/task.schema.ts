import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  status: z.enum(["todo", "in progress", "done"]),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;