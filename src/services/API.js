import axios from "axios";
import { useAuthStore } from "../store/auth";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      authStore.authUser &&
      !authStore.guest
    ) {
      authStore.logout();
    }
    return Promise.reject(error);
  }
);
