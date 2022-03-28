import { defineStore } from "pinia";
import router from "../router/index";
import AuthService from "../services/AuthService";
import { getError } from "../utils/helpers";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      isLoading: false,
      error: null,
    };
  },
  //actions
  actions: {
    //logout
    logout() {
      AuthService.logout()
        .then(() => {
          this.user = null;
          this.setGuest({ value: "isGuest" });
          if (router.currentRoute.name !== "login") {
            router.push("/login");
          }
        })
        .catch((error) => {
          this.error = getError(error);
        });
    },
    // get auth user
    async getAuthUser() {
      this.isLoading = true;
      try {
        const response = await AuthService.getUser();
        this.user = response.data.data;
        this.isLoading = false;
        return response.data.data;
      } catch (error) {
        this.isLoading = false;
        this.error = getError(error);
      }
      this.isLoading = true;
    },
    setGuest({ value }) {
      window.localStorage.setItem("guest", value);
    },
  },
  //getters
  getters: {
    authUser(state) {
      return state.user;
    },
    isAdmin(state) {
      return state.user ? state.user.isAdmin : false;
    },
    loading(state) {
      return state.isLoading;
    },
    loggedIn(state) {
      return !!state.user;
    },
    guest() {
      const storageItem = window.localStorage.getItem("guest");
      if (!storageItem) return false;
      if (storageItem === "isGuest") return true;
      if (storageItem === "isNotGuest") return false;
    },
  },
});
