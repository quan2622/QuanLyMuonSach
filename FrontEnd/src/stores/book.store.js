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
      fetching: false
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

    // async create(data) {
    //   cosnt 
    // }
    // Server
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