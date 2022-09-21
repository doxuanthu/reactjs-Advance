import axiosClient from "./axiosClient";

const authApi = {
  resource: "system",

  authentication(payload) {
    return axiosClient.post(`${this.resource}/auth`, payload);
  },

  createAccount(payload) {
    axiosClient.post(`${this.resource}/users/new`, payload);
  },

  updatePassword(key, payload) {
    axiosClient.patch(`${this.resource}/users/update/${key}`, payload);
  },
};

export default authApi;
