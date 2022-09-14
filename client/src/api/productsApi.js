import axiosClient from "./axiosClient";

const productsApi = {
  resource: "products",

  getAllProducts(params) {
    return axiosClient.get(this.resource, { params });
  },

  updateProductById(id, payload) {
    axiosClient.patch(`${this.resource}/update/${id}`, payload);
  },

  addProduct(payload) {
    axiosClient.post(`${this.resource}/new-product`, payload);
  },
};

export default productsApi;
