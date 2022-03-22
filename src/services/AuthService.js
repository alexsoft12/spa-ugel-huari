import axios from "axios";
import {useAuthStore} from "../store/auth";
export const authService = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true
});

authService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
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

export default {
    async login(payload) {
        await authService.get('/sanctum/csrf-cookie');
        return authService.post("/login", payload);
    },
    logout() {
        return authService.post("/logout");
    },
    getUser() {
        return authService.get("/api/users/auth");
    },
}