<script>
import { useUserStore } from "@/stores/user.store";

export default {
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  async created() {
    if (!this.userStore.fetching) {
      await this.userStore.getProfile();
      console.log(this.userStore.admin);
    }
  }
}
</script>

<template>
  <main class="main-right">
    <div class="content-main">
      <h1 class="title-page">Thông Tin Nhân Viên</h1>
      <div class="profile-contain mt-4">
        <div class="row">
          <div class="col-4">
            <div class="avatar">
              <img :src="userStore.admin.anhNV" :alt="userStore.admin.hoTenNV">
              <h2>{{ userStore.admin.hoTenNV }}</h2>
              <i>{{ userStore.admin.chucVu }}</i>
            </div>
          </div>
          <div class="col-8">
            <div class="profile">
              <h2>Thông tin chi tiết</h2>
              <div class="row mb-3">
                <div class="col-3 title-option">Tên:</div>
                <div class="col-9 option">{{ userStore.admin.hoTenNV }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-3 title-option">Số điện thoại:</div>
                <div class="col-9 option">{{ userStore.admin.soDienThoai }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-3 title-option">Email:</div>
                <div class="col-9 option">{{ userStore.admin.email }}</div>
              </div>
              <div class="row">
                <div class="col-3 title-option">Địa chỉ:</div>
                <div class="col-9 option">{{ userStore.admin.diaChi }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>