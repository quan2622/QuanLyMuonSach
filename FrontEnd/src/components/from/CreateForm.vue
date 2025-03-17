<script>
import { useBookStore } from "@/stores/book.store";
import { usePublisherStore } from "@/stores/publisher.store";
import { ElMessage } from "element-plus";


export default {
  props: {
    book: { type: Object, required: false },
    id: { type: String, required: false },
  },
  data() {
    return {
      detailBook: {},
      // tenSach: "",
      // donGia: "",
      // soQuyen: 0,
      // namXuatBan: null,
      // tacGia: "",
      // anhBia: null,
      // anhBiaPath: "",
      maNXB: this.book.maNXB?._id? this.book.maNXB._id: "",
      publisherStore: usePublisherStore(),
    }
  },
  async mounted() {
    await this.publisherStore.getAll();
    if (!this.publisherStore.fetch) {
      await this.publisherStore.getAll();
    }
  },
  computed: {
    isCreate() {
      return ( this.$route.name == 'book-create');
    },
  },
  methods: {
    async handleCreate() {
      const bookStore = useBookStore();
      if (this.book.tenSach && this.book.donGia && this.book.soQuyen > 0 && this.book.namXuatBan && this.book.tacGia && this.maNXB && this.book.anhBia) {
        const dataCreate = new FormData();
        dataCreate.append("tenSach", this.book.tenSach);
        dataCreate.append("donGia", this.book.donGia);
        dataCreate.append("soQuyen", this.book.soQuyen);
        dataCreate.append("namXuatBan", parseInt(this.book.namXuatBan));
        dataCreate.append("tacGia", this.book.tacGia);
        dataCreate.append("maNXB", this.maNXB);
        dataCreate.append("anhBia", this.book.anhBia);
        console.log(Object.fromEntries(dataCreate.entries()));
        await bookStore.createAdmin(dataCreate);
        if (bookStore.statusCreate) {
          ElMessage({
            message: 'Thêm mới sách thành công !',
            type: 'success',
            plain: true,
          }),
          await bookStore.getAllAdmin();
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
    async handleEdit() {
      const bookStore = useBookStore();
      const dataEdit = new FormData();
      dataEdit.append("tenSach", this.book.tenSach);
      dataEdit.append("donGia", this.book.donGia);
      dataEdit.append("soQuyen", this.book.soQuyen);
      dataEdit.append("namXuatBan", parseInt(this.book.namXuatBan));
      dataEdit.append("tacGia", this.book.tacGia);
      dataEdit.append("maNXB", this.maNXB);
      dataEdit.append("anhBia", this.book.anhBia);
      console.log(Object.fromEntries(dataEdit.entries()));
      await bookStore.updateAdmin(this.id, dataEdit);
      if (bookStore.statusUpdate) {
        ElMessage({
          message: 'Cập nhật sách thành công !',
          type: 'success',
          plain: true,
        }),
        await bookStore.getAllAdmin();
        this.$router.push("/admin/book-category");
      } else {
        ElMessage({
          message: 'Bị lỗi trong quá trình cập nhật !',
          type: 'warning',
          plain: true,
        })
      }
    },
    handleSubmit() {
      if (this.isCreate) {
        this.handleCreate();
      } else {
        this.handleEdit();
      }
    },
    handleChangImage(e) {
      const file = e.target.files[0];
      console.log(e.target.files)
      if (file) {
        this.book.anhBia = file;
        this.book.anhBiaPath = URL.createObjectURL(file);
        // console.log(this.anhBiaPath);
      }
    },
    removeImage() {
      this.book.anhBia = null;
      this.book.anhBiaPath = '';
      const anhBiaInput = document.querySelector("#anhBia");
      const anhBiaReview = document.querySelector("#anhBiaReview");
      anhBiaInput.value = "";
      anhBiaReview.src = ""

    }
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" style="padding: 0 30px;" enctype="multipart/form-data">
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="tenSach" class="form-label">Tiêu đề sách:</label>
          <input type="text" class="form-control" id="tenSach" v-model="book.tenSach" required>
        </div>
        <div class="col">
          <label for="tacGia" class="form-label">Tác giả:</label>
          <input type="text" class="form-control" id="tacGia" v-model="book.tacGia" required>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="donGia" class="form-label">Đơn giá:</label>
          <input type="text" class="form-control" id="donGia" v-model="book.donGia">
        </div>
        <div class="col">
          <label for="soQuyen" class="form-label">Số quyển: </label>
          <input type="number" class="form-control" id="soQuyen" v-model="book.soQuyen">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="namXuatBan" class="form-label">Năm xuất bản:</label>
          <input type="text" class="form-control" id="namXuatBan" v-model="book.namXuatBan">
        </div>
        <div class="col">
          <label for="maNXB" class="form-label">Nhà xuất bản: </label>
          <select class="form-control" id="maNXB" v-model="maNXB">
            <option value="" disabled>-- Chọn Nhà xuất bản --</option>
            <option v-for="data in publisherStore.publisher" :key="data._id" :value="data._id" >{{ data.tenNXB }}</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <label for="anhBia" class="form-label">Chọn ảnh bìa:</label>
      <input type="file" id="anhBia" style="margin-left: 5px;" @change="handleChangImage($event)" accept="image/*">
    </div>
    <div class="mb-3">
      <!-- <div :class="{'img-block': book.anhBiaPath}">
        <span v-if="book.anhBiaPath" @click="removeImage">X</span>
        <img v-if="book.anhBiaPath" :src="book.anhBiaPath" alt="" width="200px">
      </div> -->
      <div :class="{'img-block': book.anhBia}">
        <span v-if="book.anhBia" @click="removeImage">X</span>
        <img id="anhBiaReview" v-if="book.anhBia" :src="book.anhBiaPath || book.anhBia" alt="" width="200px">
      </div>
    </div>
    <div class="d-flex">
        <button v-if="isCreate" type="submit" class="btn btn-primary btnSignUp">Tạo mới</button>
        <button v-else type="submit" class="btn btn-warning btnSignUp">Cập nhật</button>
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
  cursor: default;
}
.img-block span:hover{
  background: #ce1212;
  color: #fff;
}
</style>