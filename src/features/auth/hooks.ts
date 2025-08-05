import { useMutation } from "@tanstack/react-query";
import api from "@/app/axios";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "./authSlice";
import type { AuthResponse, User } from "@/types";

type LoginPayload = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await api.post("/auth/login", {
        username: data.username,
        password: data.password,
      });
      return res.data as AuthResponse;
    },
    onSuccess: (data) => {
      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };
      dispatch(setCredentials({ user, token: data.accessToken }));
      console.log(`User is ${user}`);
      console.log(`Token is ${data.accessToken}`);
    },
  });
};
