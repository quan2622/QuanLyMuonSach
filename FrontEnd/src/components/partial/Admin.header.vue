<script>
import { useUserStore } from "@/stores/user.store";

export default {
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  methods: {
    async handleSignOut() {
      await this.userStore.SignOut();
      this.$router.push("/admin/login");
    },
    handleNavToLogIn() {
      this.$router.push("/admin/login");
    }
  }
}
</script>

<template>
  <header class="header-admin d-flex align-items-center sticky-top">
    <div class="container-fluid position-relative d-flex align-items-center justify-content-between">
      <span class="logo d-flex align-items-center me-auto me-xl-0">
        <h1>BookStoré</h1> <span>.</span>
      </span>        
      <button class="btn-getstarted" href="" @click="handleNavToLogIn" v-if="!userStore.token">Đăng nhập</button>
      <button class="btn-getstarted" href="" @click="handleSignOut" v-else>Đăng xuất</button>
    </div>
  </header>
</template>