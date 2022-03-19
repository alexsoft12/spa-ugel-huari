import router from '@/router';
import AuthService from "../../services/AuthService";
import {getError} from "../../utils/helpers";

export const namespaced = true;

export const state = {
    user: null,
    isLoading: false,
    error: null,
};

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setError(state, error) {
        state.error = error;
    },
    clearError(state) {
        state.error = null;
    },
};

export const actions = {
    logout({commit, dispatch}) {
        return AuthService.logout()
            .then(() => {
                commit('setUser', null);
                router.push('/login');
            })
            .catch(error => {
                commit('setError', getError(error));
                dispatch('alert/error', error, {root: true});
            });
    },
    async getUser({commit}) {
        commit('setLoading', true);
        try {
            const response = await AuthService.getUser();
            commit('setUser', response.data.data);
            return response.data.data;
        } catch (error) {
            commit('setUser', null);
            commit('setError', getError(error));
        }
        commit('setLoading', false);
    },
    setGuest(context, {value}) {
        window.localStorage.setItem("guest", value);
    },
};

export const getters = {
    authUser: (state) => {
        return state.user;
    },
    isAdmin: (state) => {
        return state.user ? state.user.isAdmin : false;
    },
    error(state) {
        return state.error;
    },
    loading: (state) => {
        return state.loading;
    },
    loggedIn: (state) => {
        return !!state.user;
    },
    guest: () => {
        const storageItem = window.localStorage.getItem("guest");
        if (!storageItem) return false;
        if (storageItem === "isGuest") return true;
        if (storageItem === "isNotGuest") return false;
    },
};