import {defineStore} from "pinia";
import {authorizationService} from "../services/AuthorizationService";
import {getError} from "../utils/helpers";

function setPaginatedAuthorization(state, response) {
    state.authorizations = response.data.data;
    state.meta = response.data.meta;
    state.links = response.data.links;
    state.loading = false;
}

export const useAuthorizationStore = defineStore("authorization", {
    state: () => ({
        authorizations: [],
        meta: null,
        links: null,
        loading: false,
        error: null,
    }),

    //actions
    actions: {
        async fetchAuthorizations(page) {
            this.loading = true;
            this.error = null;
            await authorizationService
                .getAuthorizations(page)
                .then((response) => {
                    setPaginatedAuthorization(this, response)
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = getError(error);
                });
        },
        async paginated(link) {
            this.loading = true;
            this.error = null;
            await authorizationService
                .paginated(link)
                .then((response) => {
                    setPaginatedAuthorization(this, response)
                })
                .catch((error) => {
                    this.loading = false;
                    this.error = getError(error);
                });
        },
        async create(data) {
            await authorizationService
                .create(data)
                .then((response) => {
                    // add new authorization to first the list
                    this.authorizations.unshift(response.data.data);
                    return response.data;
                })
        },
    }, // getters
    getters: {
        getAuthorizations: (state) => state.authorizations,
        getMeta: (state) => state.meta,
        getLinks: (state) => state.links,
        getLoading: (state) => state.loading,
        getError: (state) => state.error,
    },
});
