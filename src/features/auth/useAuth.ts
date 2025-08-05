import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { logout } from "./authSlice";
import { persistor } from "@/app/store";

export const useAuth = () => {
  const { user, token, isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(logout());
    persistor.flush().then(() => {
      persistor.purge(); // removes persisted state so next load is clean
    });
  };

  return {
    user,
    token,
    isAuthenticated,
    signOut,
  };

  
};
