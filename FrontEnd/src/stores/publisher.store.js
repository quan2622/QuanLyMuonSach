import { defineStore } from "pinia";
import { axiosInstance } from "../services/api.service";

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d").replace(/Đ/g, "D") // Thay đ -> d
    .toLowerCase(); // Chuyển về chữ thường
}

export const usePublisherStore = defineStore("publisher", {
  state: () => {
    return {
      publisher: [],
      fetch: false,
      statusCreate: false,
      statusUpdate: false,
      statusDelete: false,
    };
  },

  actions: {
    async getAll() {
      return await axiosInstance.get("/admin/publisher")
        .then((res) => {
          this.publisher = res.data;
          this.fetch = true;
        })
        .catch((err) => console.log(err))
    },
    async create(data) {
      return await axiosInstance.post("/admin/publisher", data)
        .then((res) => {
          this.statusCreate = res.data.status;
        })
        .catch((err) => console.log(err))
    },
    async update(publisherId, data) {
      return await axiosInstance.put(`/admin/publisher/${publisherId}`, data)
        .then((res) => {
          this.statusUpdate = true;
        })
        .catch((err) => console.log(err))
    },
    async deletePublisher(publisherId) {
      return await axiosInstance.delete(`/admin/publisher/${publisherId}`)
        .then((res) => {
          this.statusDelete = true;
        })
        .catch((err) => console.log(err))
    },
  },

  getters: {
    detailBook(state) {
      return (id) => state.books.find((book) => book._id == id);
    },
    filterBook(state) {
      const search = removeVietnameseTones(state.searchTxt);
      return state.books.filter((book) => removeVietnameseTones(book.tenSach).toUpperCase().indexOf(search.toUpperCase()) != -1);
    },
  }
})