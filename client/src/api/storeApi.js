import axiosClient from "./axiosClient";

const storeApi = {
  resource: "products",

  getProducts() {
    return axiosClient.get(`${this.resource}`);
  },
};

export default storeApi;
