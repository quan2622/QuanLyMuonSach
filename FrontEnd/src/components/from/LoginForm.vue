<script>
import { useUserStore } from "@/stores/user.store";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      soDienThoai: "",
      passWord: "",
    }
  },
  methods: {
    async handleLogIn() {
      const userStore = useUserStore();
      const loginData = {
        soDienThoai: this.soDienThoai,
        passWord: this.passWord,
      }

      if (this.$route.path.startsWith("/admin")) {
        await userStore.SignInAdmin(loginData);
      }
      else await userStore.SignIn(loginData);

      if (userStore.token) {
        ElMessage({
          message: "Đăng nhâp thành công!",
          type: 'success',
          plain: true,
        });
        if (this.$route.path.startsWith("/admin")) {
          this.$router.push("/admin/profile");
        }
        else {
          const redirectPath = this.$route.query.redirect || '/'
          this.$router.push(redirectPath);
        }
      } else {
        ElMessage({
          message: "Mật khẩu hoặc tài khoản không đúng. Vui lòng đăng nhập lại!",
          type: 'error',
          plain: true,
        });
      }
    }
  }
}
</script>

<template>
  <form class="loginForm" @submit.prevent="handleLogIn">
    <div class="mb-3">
      <label for="soDienThoai" class="form-label">Số Điện Thoại</label>
      <input type="tel" id="soDienThoai" class="form-control" v-model="soDienThoai" required>
    </div>
    <div class="mb-3">
      <label for="passWord" class="form-label">Mật Khẩu</label>
      <input type="password" id="passWord" class="form-control" v-model="passWord" required>
    </div>
    <div class="d-flex justify-content-between">
      <button type="submit" class="btnSignUp">Đăng Nhập</button>
    </div>
  </form>
</template>