<script>
import { useBookStore } from "@/stores/book.store";
import { usePublisherStore } from "@/stores/publisher.store";
import { ElMessage } from "element-plus";


export default {
  data() {
    return {
      tenSach: "",
      donGia: "",
      soQuyen: 0,
      namXuatBan: null,
      tacGia: "",
      anhBia: null,
      anhBiaPath: "",
      maNXB: "",
      publisherStore: usePublisherStore(),
    }
  },
  async mounted() {
    await this.publisherStore.getAll();
    if (!this.publisherStore.fetch) {
      await this.publisherStore.getAll();
    }
  },
  methods: {
    async handleCreate() {
      const bookStore = useBookStore();
      if (this.tenSach && this.donGia && this.soQuyen > 0 && this.namXuatBan && this.tacGia && this.maNXB && this.anhBia) {
        const dataCreate = new FormData();
        dataCreate.append("tenSach", this.tenSach);
        dataCreate.append("donGia", this.donGia);
        dataCreate.append("soQuyen", this.soQuyen);
        dataCreate.append("namXuatBan", parseInt(this.namXuatBan));
        dataCreate.append("tacGia", this.tacGia);
        dataCreate.append("maNXB", this.maNXB);
        dataCreate.append("anhBia", this.anhBia);
        console.log(Object.fromEntries(dataCreate.entries()));
        await bookStore.createAdmin(dataCreate);
        if (bookStore.statusCreate) {
          ElMessage({
            message: 'Thêm mới sách thành công !',
            type: 'success',
            plain: true,
          })
          this.$router.push("/admin/book-category");
        } else {
          ElMessage({
            message: 'Sách đã tồn tại !',
            type: 'warning',
            plain: true,
          })
        }
       }else {
        ElMessage({
          message: 'Vui lòng điền dầy đủ thông tin !',
          type: 'warning',
          plain: true,
        })
      }
    },
    handleChangImage(e) {
      const file = e.target.files[0];
      console.log(e.target.files)
      if (file) {
        this.anhBia = file;
        this.anhBiaPath = URL.createObjectURL(file);
        // console.log(this.anhBiaPath);
      }
    },
    removeImage() {
      this.anhBia = null;
      this.anhBiaPath = '';
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleCreate" style="padding: 0 30px;" enctype="multipart/form-data">
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="tenSach" class="form-label">Tiêu đề sách:</label>
          <input type="text" class="form-control" id="tenSach" v-model="tenSach" required>
        </div>
        <div class="col">
          <label for="tacGia" class="form-label">Tác giả:</label>
          <input type="text" class="form-control" id="tacGia" v-model="tacGia" required>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="donGia" class="form-label">Đơn giá:</label>
          <input type="text" class="form-control" id="donGia" v-model="donGia">
        </div>
        <div class="col">
          <label for="soQuyen" class="form-label">Số quyển: </label>
          <input type="number" class="form-control" id="soQuyen" v-model="soQuyen">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="namXuatBan" class="form-label">Năm xuất bản:</label>
          <input type="text" class="form-control" id="namXuatBan" v-model="namXuatBan">
        </div>
        <div class="col">
          <label for="maNXB" class="form-label">Nhà xuất bản: </label>
          <select class="form-control" id="maNXB" v-model="maNXB">
            <option value="" disabled>-- Chọn Nhà xuất bản --</option>
            <option v-for="data in publisherStore.publisher" :key="data._id" :value="data._id">{{ data.tenNXB }}</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <label for="anhBia" class="form-label">Chọn ảnh bìa:</label>
      <input type="file" id="anhBia" style="margin-left: 5px;" @change="handleChangImage($event)" accept="image/*">
    </div>
    <div class="mb-3">
      <div :class="{'img-block': anhBiaPath}">
        <span v-if="anhBiaPath" @click="removeImage">X</span>
        <img v-if="anhBiaPath" :src="anhBiaPath" alt="" width="200px">
      </div>
    </div>
    <div class="d-flex">
        <button type="submit" class="btnSignUp">Đăng Ký</button>
    </div>
  </form>
</template>
<style scoped>
.img-block {
  padding: 10px;
  border-radius: 10px;
  background: #a58b8b;
  display: inline-block;
  position: relative;
  /* overflow: hidden; */
}
.img-block span{
  background: #fff;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 1;
  font-weight: bold;
  border-bottom-left-radius: 10px ;
  border-top-right-radius: 8px ;
}
.img-block span:hover{
  background: #ce1212;
  color: #fff;
}
</style>