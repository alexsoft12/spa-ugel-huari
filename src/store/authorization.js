import {defineStore} from 'pinia';
import {authorizationService} from '../services/AuthorizationService';
import {getError} from "../utils/helpers";

export const useAuthorizationStore = defineStore('authorization', {
    state: () => ({
        authorizations: [],
        meta: null,
        links: null,
        loading: false,
        error: null
    }),
    //actions
    actions: {
        async fetchAuthorizations(){
            this.loading = true;
            this.error = null;
           await authorizationService.getAuthorizations()
                .then(response => {
                    this.authorizations = response.data.data;
                    this.meta = response.data.meta;
                    this.links = response.data.links;
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = getError(error);
                });
        },
        async paginated(link){
            this.loading = true;
            this.error = null;
            await authorizationService.paginated(link)
                .then(response => {
                    this.authorizations = response.data.data;
                    this.meta = response.data.meta;
                    this.links = response.data.links;
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = getError(error);
                });
        },
        // getters
        getters: {
            getAuthorizations: state => state.authorizations,
            getMeta: state => state.meta,
            getLinks: state => state.links,
            getLoading: state => state.loading,
            getError: state => state.error
        }
    }
});