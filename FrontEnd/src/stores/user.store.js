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
          this.token = res.data.accountInfo?.token;
          document.cookie = `token=${this.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; SameSite=Lax`;
          this.user = res.data.accountInfo;
        })
        .catch((err) => console.log(err))
    },
    // Admin
    async getProfile() {
      return await axiosInstance.post("/admin/account/profile", {}, { headers: { Authorization: `Bearer ${this.token}` } })
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
          this.token = res.data.accountInfo?.token;
          document.cookie = `token=${this.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; SameSite=Lax`;
          this.admin = res.data.accountInfo;
        })
        .catch((err) => console.log(err))
    },
    // All
    async SignOut() {
      await axiosInstance.get("/auth/signOut")
      this.token = null;
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; max-age=0";
    }    
  }
});