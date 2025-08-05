import axios from "axios";
import { store } from "./store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log(`This is the token ${token}`);
  }
  return config;
});

// Optional: response interceptor to handle expiry / force logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // token invalid; dispatch logout
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default api;
