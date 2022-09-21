import axiosClient from "./axiosClient";

const storeApi = {
  resource: "system",

  getProducts() {
    return axiosClient.get(`${this.resource}/products`);
  },
};

export default storeApi;
