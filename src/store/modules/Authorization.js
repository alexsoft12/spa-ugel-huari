import {getError} from "../../utils/helpers";
import authorizationService from "../../services/AuthorizationService";

export const namespaced = true;

function setPaginated(commit, response) {
    commit('setAuthorizations', response.data.data);
//set meta
    commit('setMeta', response.data.meta);
//set links
    commit('setLinks', response.data.links);
// set loading
    commit('setLoading', false);
}

// state
export const state = {
    authorizations: [],
    meta: null,
    links: null,
    loading: false,
    error: null
};

//mutations
export const mutations = {
    setAuthorizations(state, authorizations) {
        state.authorizations = authorizations;
    },
    setMeta(state, meta) {
        state.meta = meta;
    },
    setLinks(state, links) {
        state.links = links;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setError(state, error) {
        state.error = error;
    }
};

// actions
export const actions = {
    async fetchAuthorizations({commit}, page) {
        commit('setLoading', true);
        commit('setError', null);
        await authorizationService.getAuthorizations(page)
            .then((response) => {
                setPaginated(commit, response);
            }).catch((error) => {
                commit('setLoading', false);
                commit('setError', getError(error));
            });
    },
    async paginated({commit}, link) {
        commit("setLoading", true);
        authorizationService.paginated(link)
            .then((response) => {
                setPaginated(commit, response);
            })
            .catch((error) => {
                commit("setLoading", false);
                commit("setError", getError(error));
            });
    },
    async fetchAuthorization({commit}, id) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await authorizationService.getAuthorization(id);
            commit('setAuthorization', response.data);
        } catch (error) {
            commit('setError', getError(error));
        }
    },
    async createAuthorization({commit}, authorization) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await authorizationService.createAuthorization(authorization);
            commit('setAuthorization', response.data);
        } catch (error) {
            commit('setError', getError(error));
        }
    },
    async updateAuthorization({commit}, authorization) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            const response = await authorizationService.updateAuthorization(authorization);
            commit('setAuthorization', response.data);
        } catch (error) {
            commit('setError', getError(error));
        }
    },
    async deleteAuthorization({commit}, id) {
        commit('setLoading', true);
        commit('setError', null);
        try {
            await authorizationService.deleteAuthorization(id);
            commit('setAuthorization', null);
        } catch (error) {
            commit('setError', getError(error));
        }
    }
};

// getters
export const getters = {
    authorizations: state => state.authorizations,
    meta: state => state.meta,
    links: state => state.links,
    loading: state => state.loading,
    error: state => state.error
};