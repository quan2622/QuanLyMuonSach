<script>
import { useUserStore } from "@/stores/user.store";

export default {
  data() {
    return {
      userStore: useUserStore(),
    }
  }
}
</script>

<template>
  <main>
    <div class="content-main">
      <h1 class="title-page">Thông Tin Nhân Viên</h1>
      <div class="profile-contain mt-4">
        <div class="row">
          <div class="col-4">
            <div class="avatar">
              <img src="https://bootstrapmade.com/content/demo/NiceAdmin/assets/img/profile-img.jpg" alt="Ảnh">
              <h2>{{ userStore.admin.hoTenNV }}</h2>
              <i>Quản trị viên</i>
              <!-- <div class="staff-social">
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-linkedin-in"></i>
              </div> -->
            </div>
          </div>
          <div class="col-8">
            <div class="profile">
              <h2>Thông tin chi tiết</h2>
              <div class="row">
                <div class="col-3 title-option">Tên:</div>
                <div class="col-9 option">{{ userStore.admin.hoTenNV }}</div>
              </div>
              <div class="row">
                <div class="col-3 title-option">Số điện thoại:</div>
                <div class="col-9 option">{{ userStore.admin.soDienThoai }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>