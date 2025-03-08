<script>
import SignUpForm from "@/components/from/SignUpForm.vue"

export default {
  components: {
    SignUpForm
  },
  methods: {
    handleNavToLogIn() {
      this.$router.push("/login");
    }
  }
}
</script>

<template>
  <main class="container-fluid">
    <div class="mainFrom row">
      <div class="col-5 left-panel d-flex flex-column align-items-center justify-content-center">
          <h2>Xin chào, <br> Chào mừng đến!</h2>
          <div class="logo">✈️</div>
          <h1>BookStoré</h1>
          <p>Chúng tôi cung cấp dịch vụ cho mượn sách đa thể loại với quy trình đơn giản và nhanh chóng. Hãy tham gia ngay để khám phá kho sách phong phú!</p>
          <button class="btnSignIn" @click="handleNavToLogIn">ĐĂNG NHẬP</button>
      </div>
      <div class="col-7 right-panel">
          <div class="text-center title">Đăng ký <span>Tài Khoản</span></div>
          <SignUpForm></SignUpForm>
      </div>
    </div>
  </main>
</template>