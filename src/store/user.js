import {defineStore} from "pinia";
import {getError} from "../utils/helpers";
import {userService} from "../services/UserService";

function setPaginatedUsers(state, response) {
    state.users = response.data.data;
    state.meta = response.data.meta;
    state.links = response.data.links;
    state.loading = false;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        users: null,
        meta: null,
        links: null,
        loading: false,
        userError: null,
        userData: null,
        userSave: null,
    }),
    //actions
    actions: {
        async getUsers(page) {
            this.loading = true;
            this.userError = null;
            try {
                await userService.getUsers(page).then(response => {
                    setPaginatedUsers(this, response);
                });
            } catch (error) {
                this.userError = getError(error);
                this.loading = false;
            }
        },
        async getUserFromAPI(dni) {
            this.loading = true;
            this.userError = null;
            try {
                if (dni.length !== 8) {
                    const error = Error(
                        "Nro DNI debe contener 8 dígitos"
                    );
                    error.name = "DniError";
                    throw error;
                }
                await userService.getUserFromAPI(dni).then(response => {
                    this.userData = response.data;
                });
            } catch (error) {
                this.userError = getError(error);
                this.loading = false;
            }
        },
        // create
        async createUser(user) {
            this.loading = true;
            this.userError = null;
            try {
                await userService.createUser(user).then(response => {
                    this.userSave = response.data.data;
                });
            } catch (error) {
                this.userError = getError(error);
                this.loading = false;
            }
        },

    }

})