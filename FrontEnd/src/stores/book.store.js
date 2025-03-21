import { defineStore } from "pinia";
import { axiosInstance } from "../services/api.service";

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d").replace(/Đ/g, "D") // Thay đ -> d
    .toLowerCase(); // Chuyển về chữ thường
}

export const useBookStore = defineStore("book", {
  state: () => {
    return {
      books: [],
      searchTxt: "", 
      fetching: false,
      fetchingAdmin: false,
      statusCreate: false,
      statusUpdate: false,
      statusDelete: false,
    };
  },

  actions: {
    // Client
    async getAll() {
      return await axiosInstance.get("/home")
        .then((res) => {
          console.log(res.data);
          this.books = [...res.data];
          this.fetching = true;
        })
        .catch((err) => { console.log(err) })
    },
    
    handleChangeTxtSearch(value) {
      this.searchTxt = value;
    },

    // Admin
    async getAllAdmin() {
      return await axiosInstance.get("/admin/book")
        .then((res) => {
          console.log(res.data)
          this.books = res.data;
          this.fetchingAdmin = true;
        })
        .catch((err) => console.log(err))
    },
    async createAdmin(data) {
      return await axiosInstance.post("/admin/book", data, {
        headers: { "Content-Type": "multipart/form-data", }, timeout: 5000
      })
        .then((res) => {
          this.statusCreate = res.data.status;
          return res.data.message;
        })
        .catch((err) => console.log(err))
    },
    async updateAdmin(bookId, data) {
      return await axiosInstance.put(`/admin/book/${bookId}`, data, {
        headers: { "Content-Type": "multipart/form-data", }, timeout: 20000
      })
        .then((res) => {
          this.statusUpdate = true;
        })
        .catch((err) => console.log(err))
    },
    async deleteAdmin(bookId) {
      return await axiosInstance.delete(`/admin/book/${bookId}`)
        .then((res) => {
          this.statusDelete = true;
        })
        .catch((err) => console.log(err))
    }
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