<script>
import LoginForm from "@/components/from/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },

  methods: {
    handleNavSignIn() {
      this.$router.push("/signup")
    }
  }
}
</script>

<template>
  <main class="container-fluid">
    <div class="mainFrom row">
      <div class="col-5 left-panel d-flex flex-column align-items-center justify-content-center">
          <h2>Chào mừng trở lại!</h2>
          <div class="logo"><i class="fa-solid fa-book-open-reader"></i></div>
          <h1>BookStoré</h1>
          <p>Hãy đăng nhập để tiếp tục khám phá kho sách phong phú và tận hưởng dịch vụ của chúng tôi.</p>
          <button class="btnSignIn" @click="handleNavSignIn">Đăng Ký</button>
      </div>
      <div class="col-7 right-panel right-panel-login">
        <div class="text-center title">Đăng nhập <span>Tài Khoản</span></div>
          <LoginForm></LoginForm>
      </div>
    </div>
  </main>
</template>