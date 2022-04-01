import * as API from "../services/API";

export const userService = {
    getUser: async (userId) => {
        const response = await API.get(`/users/${userId}`);
        return response.data;
    },
    getUserFromAPI: (dni) => {
        return API.apiClient.get(`/user-from-api/${dni}`);
    },
    getUsers: (page) => {
        return API.apiClient.get("/users?page=" + page);
    },
    createUser: async (user) => {
       return  await API.apiClient.post("/users", user);
    },
    updateUser: async (userId, user) => {
        const response = await API.put(`/users/${userId}`, user);
        return response.data;
    },
    deleteUser: async (userId) => {
        const response = await API.delete(`/users/${userId}`);
        return response.data;
    },
};