<script>
import { useUserStore } from "@/stores/user.store";
import { ElMessage } from "element-plus";


export default {
  data() {
    return {
      hoLot: "",
      ten: "",
      phai: "Không rõ",
      diaChi: "",
      ngaySinh: Date.now(),
      dienThoai: "",
      passWord: "",
      passWord2: "",
    }
  },

  methods: {
    async handleSignUp() {
      const userStore = useUserStore();
      if (this.hoLot && this.ten && this.diaChi && this.phai && this.ngaySinh && this.dienThoai && this.passWord) {
        if (this.passWord === this.passWord2) {
          const dataSignUp = {
            hoLot: this.hoLot,
            ten: this.ten,
            ngaySinh: this.ngaySinh,
            phai: this.phai,
            diaChi: this.diaChi,
            dienThoai: this.dienThoai,
            passWord: this.passWord,
          }
          await userStore.SignUp(dataSignUp);

          if (userStore.status) {
            ElMessage({
              message: 'Đăng ký tài khoản thành công !',
              type: 'success',
              plain: true,
            })
            this.$router.push("/login");
          } else {
            ElMessage({
              message: 'Vui lòng đăng ký bằng số điện thoại khác !',
              type: 'warning',
              plain: true,
            })
          }
        } else {
          ElMessage({
            message: 'Mật khẩu nhập lại không đúng !',
            type: 'error',
            plain: true,
          })
        }
      } else {
        ElMessage({
          message: 'Vui lòng điền dầy đủ thông tin !',
          type: 'warning',
          plain: true,
        })
      }
    },
    
  }
}
</script>

<template>
  <form @submit.prevent="handleSignUp">
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="hoLot" class="form-label">Họ Lót:</label>
          <input type="text" class="form-control" id="hoLot" v-model="hoLot" required>
        </div>
        <div class="col">
          <label for="ten" class="form-label">Tên:</label>
          <input type="text" class="form-control" id="ten" v-model="ten" required>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="ngaySinh" class="form-label">Ngày Sinh:</label>
          <input type="date" class="form-control" id="ngaySinh" v-model="ngaySinh">
        </div>
        <div class="col">
          <label for="phai" class="form-label">Phái: </label>
          <div class="sex">
            <div>
              <input type="radio" name="phai" value="Nam" id="nam" v-model="phai"> <label for="nam">Nam</label>
            </div>
            <div>
              <input type="radio" name="phai" value="Nữ" id="nu" v-model="phai"> <label for="nu">Nữ</label>
            </div>
            <div>
              <input type="radio" name="phai" value="Không rõ" id="khongRo" v-model="phai" checked> <label for="khongRo">Không rõ</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3">
    </div>
    <div class="mb-3">
        <label for="diaChi" class="form-label">Địa Chỉ:</label>
        <input type="text" class="form-control" id="diaChi" v-model="diaChi" required>
    </div>
    <div class="mb-3">
        <label for="dienThoai" class="form-label">Số Điện Thoại:</label>
        <input type="tel" class="form-control" id="dienThoai" v-model="dienThoai" required>
    </div>
    <div class="mb-3">
        <label for="password1" class="form-label">Mật Khẩu:</label>
        <input type="password" class="form-control" id="password1" v-model="passWord" required>
    </div>
    <div class="mb-3">
        <label for="password2" class="form-label">Nhập Lại Mật Khẩu:</label>
        <input type="password" class="form-control" id="password2" v-model="passWord2" required>
    </div>
    <div class="d-flex">
        <button type="submit" class="btnSignUp">Đăng Ký</button>
    </div>
  </form>
</template>