<script>
import {RouterLink} from 'vue-router'
import {useUserStore} from '@/stores/user.store'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  methods: {
    handleSignOut(user) {
      user.SignOut();
      ElMessage({
        message: 'Đăng xuất thành công',
        type: 'warning',
        plain: true,
      })
      this.$router.push('/')
    },
    handleNavToLogin() {
      this.$router.push('/login')
    },
    handleSelect() {
      return this.$route.name;
    }
  },
}
</script>

<template>
  <header class="header header d-flex align-items-center sticky-top">
    <div
      class="container position-relative d-flex align-items-center justify-content-between"
    >
      <span class="logo d-flex align-items-center me-auto me-xl-0">
        <h1>BookStoré</h1>
        <span>.</span>
      </span>
      <nav class="nav-menu">
        <ul class="">
          <li :class="handleSelect() == 'home'?'li-active' : ''">
            <RouterLink to="/">
              <span>Trang chủ</span>
            </RouterLink>
          </li>
          <li :class="handleSelect() == 'borrow'?'li-active' : ''">
            <RouterLink to="/borrow">
              <span>Phiếu mượn</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <button
        class="btn-getstarted"
        v-if="!userStore.token"
        @click="handleNavToLogin()"
      >
        Đăng Nhập
      </button>
      <button class="btn-getstarted" v-else @click="handleSignOut(userStore)">
        Đăng Xuất
      </button>
      <!-- <a class="btn-getstarted" href="">Đăng xuất</a> -->
    </div>
  </header>
</template>
<style scoped></style>
