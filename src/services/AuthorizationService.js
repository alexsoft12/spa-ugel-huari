import * as API from '../services/API';

export default {
    getAuthorizations(page) {
        return API.apiClient.get('/authorizations?page=' + page);
    },
    paginated(link) {
        return API.apiClient.get(link);
    },
    createAuthorization(data) {
        return API.apiClient.post('/authorizations', data);
    },
};