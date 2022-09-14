import axiosClient from "./axiosClient";

const storeApi = {
  resource: "store",

  getCategories() {
    return axiosClient.get(`${this.resource}/categories`);
  },

  updatecategoryById(id, payload) {
    axiosClient.patch(`${this.resource}/categories/update/${id}`, payload);
  },

  addNewCategory(payload) {
    axiosClient.post(`${this.resource}/categories/new`, payload);
  },

  deleteCategoryById(id) {
    axiosClient.delete(`${this.resource}/categories/remove/${id}`);
  },

  getbrands() {
    return axiosClient.get(`${this.resource}/brands`);
  },

  updatebrandById(id, payload) {
    axiosClient.patch(`${this.resource}/brands/update/${id}`, payload);
  },

  addNewbrand(payload) {
    axiosClient.post(`${this.resource}/brands/new`, payload);
  },

  deleteBrandById(id) {
    axiosClient.delete(`${this.resource}/brands/remove/${id}`);
  },
};

export default storeApi;
