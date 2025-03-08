import { defineStore } from "pinia";
import { axiosInstance } from "../services/api.service";
import moment from "moment";

export const useBorrowStore = defineStore("borrow", {
  state: () => {
    return {
      dataBorrow: [],
      fetching: false,
      statusCreate: false,
      statusDelete: false,
      messageUpdate: '',
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
    }
  },

  getters: {
    formatDateTime(state) {
      return state.dataBorrow.map(item => ({
        ...item,
        ngayMuon: moment(item.ngayMuon).format("HH:mm - DD/MM/YYYY"),
        ngayTra: moment(item.ngayTra).format("HH:mm - DD/MM/YYYY"),
      }))
    }
  }
})