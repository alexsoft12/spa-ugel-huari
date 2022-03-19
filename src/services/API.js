import axios from 'axios';
import store from '../store';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + '/api',
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            store.getters["auth/authUser"] &&
            !store.getters["auth/guest"]
        ) {
            store.dispatch("auth/logout");
        }
        return Promise.reject(error);
    }
);