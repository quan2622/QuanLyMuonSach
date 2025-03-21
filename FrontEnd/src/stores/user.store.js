import { defineStore } from "pinia";
import { axiosInstance } from "../services/api.service";

export function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: getTokenFromCookie(),
      user: {},
      admin: {},
      status: false,
      fetching: false,
    }
  },

  actions: {
    // CLient
    async SignUp(data) {
      return await axiosInstance.post("/account/create", data)
        .then((res) => {
          this.status = res.data.status;
          return res.data.accountId;
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
    },

    async SignIn(data) {
      return await axiosInstance.post("/auth/signIn", data)
        .then((res) => {
          this.token = res.data.token;
          document.cookie = `token=${this.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; SameSite=Lax`;
          localStorage.setItem("dataId", res.data.accountInfo._id);
          this.user = res.data.accountInfo;
        })
        .catch((err) => console.log(err))
    },
    // Admin
    async getProfile() {
      const id = localStorage.getItem('dataId');
      console.log(id);
      return await axiosInstance.post("/admin/account/profile", {}, { headers: { Authorization: `Bearer ${id}` } })
        .then((res) => {
          this.admin = res.data;
          this.fetching = true;
        })
        .catch((err) => console.log(err))
    },

    async SignUpAdmin(data) {
      return await axiosInstance.post("/admin/account", data)
        .then((res) => {
          return res.data.message;
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
    },
    async SignInAdmin(data) {
      return await axiosInstance.post("admin/auth/signIn", data)
        .then((res) => {
          console.log("Token mới: " + res.data.token);
          this.token = res.data.token;
          document.cookie = `token=${this.token}; path=/; max-age=${60 * 60}; secure; SameSite=Lax`;
          localStorage.setItem("dataId", res.data.accountInfo._id);
          this.admin = res.data.accountInfo;
        })
        .catch((err) => console.log(err))
    },
    // All
    async SignOut() {
      await axiosInstance.get("/auth/signOut")
      this.token = null;
      localStorage.clear('dataId');
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; max-age=0";
    }    
  }
});