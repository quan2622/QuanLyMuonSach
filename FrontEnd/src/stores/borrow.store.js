import { defineStore } from "pinia";
import { axiosInstance } from "../services/api.service";
import moment from "moment";

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d").replace(/Đ/g, "D") // Thay đ -> d
    .toLowerCase(); // Chuyển về chữ thường
}

export const useBorrowStore = defineStore("borrow", {
  state: () => {
    return {
      dataBorrow: [],
      fetching: false,
      statusCreate: false,
      statusDelete: false,
      messageUpdate: '',
      searchTxt: '',
    }
  },

  actions: {
    // Client
    async getAll() {
      return await axiosInstance.get("/borrow")
        .then((res) => {
          console.log(res.data.dataBorrow);
          this.dataBorrow = [...res.data.dataBorrow];
          this.fetching = true;
        })
      .catch((err) => console.log(err))
    },

    async create(data) {
      return await axiosInstance.post("/borrow/create", data)
        .then((res) => {
          this.statusCreate = res.data.status;
          return res.data.message;
        })
        .catch((err) => console.log(err))
    },

    async deleteAdmin(borrowId) {
      return await axiosInstance.delete(`admin/borrow/delete/${borrowId}`)
        .then((res) => {
          this.statusDelete = res.data.status;
        })
        .catch((err) => console.log(err))
    },

    async delete(borrowId) {
      return await axiosInstance.delete(`/borrow/delete/${borrowId}`)
        .then((res) => {
          this.statusDelete = res.data.status;
        })
        .catch((err) => console.log(err))
    },
    // Admin
    async getAllAdmin() {
      return await axiosInstance.get("/admin/borrow")
        .then((res) => {
          console.log(res.data.borrowList);
          this.dataBorrow = res.data.borrowList;
        })
        .catch((err) => console.log(err))
    },
    async updateStatusAdmin(data) {
      return await axiosInstance.post("/admin/borrow/update", data)
        .then((res) => {
          this.statusUpdate = res.data.message;
        })
        .catch((err) => console.log(err))
    },
    handleChangeTxtSearch(value) {
      this.searchTxt = value;
    }
  },

  getters: {
    formatDateTime(state) {
      return state.dataBorrow.map(item => ({
        ...item,
        ngayMuon: moment(item.ngayMuon).format("HH:mm - DD/MM/YYYY"),
        ngayTra: moment(item.ngayTra).format("HH:mm - DD/MM/YYYY"),
      }))
    },
    filterBorrowId(state) {
      return state.dataBorrow.filter((data) => {
        const search = removeVietnameseTones(state.searchTxt)
        return (
          (data._id).toLowerCase().startsWith(search) ||
          removeVietnameseTones(`${data.maDocGia?.hoLot} ${data.maDocGia?.ten}`).indexOf(search) != -1
        );
      });
    },
    detailBorrow(state) {
      return (id) => state.dataBorrow.find((data) => data._id == id);
    }
  }
})