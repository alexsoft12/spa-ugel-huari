import * as API from "../services/API";

export const authorizationService = {
  getAuthorizations(page) {
    return API.apiClient.get("/authorizations?page=" + page);
  },
  paginated(link) {
    return API.apiClient.get(link);
  },
  create(data) {
    return API.apiClient.post("/authorizations", data);
  },
};
