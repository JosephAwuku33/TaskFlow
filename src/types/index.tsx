export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type TaskStatus = "todo" | "in progress" | "done";

export type Task = {
  id: number;
  todo: string; // title
  completed: boolean;
  userId?: number;
};

export type LocalTask = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done";
  createdAt: string;
  updatedAt: string;
};

export type TaskFormValues = {
  title: string;
  description?: string;
  status: LocalTask["status"]; // Use the same status values
};
