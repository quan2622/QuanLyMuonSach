<script>
import { useBookStore } from "@/stores/book.store";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  data() {
    return {
      bookStore: useBookStore(),
    }
  },
  async mounted() {
    if (!this.bookStore.fetchingAdmin)
    {
      await this.bookStore.getAllAdmin();
    }
  },
  methods: {
    handleStatus(soLuong, daMuon) {
      return (soLuong - daMuon) != 0;
    },
    handleDeleteBook(bookId) {
      ElMessageBox.confirm(
        `Xác nhận xóa sách`,
        {
          confirmButtonText: 'Xác Nhận',
          cancelButtonText: 'Hủy',
          type: 'warning',
          draggable: true,
        }
      )
        .then(async () => {
          await this.bookStore.deleteAdmin(bookId);
          if (this.bookStore.statusDelete) {
            ElMessage({
              message: 'Xóa sách thành công !',
              type: 'success',
              plain: true,
            });
            await this.bookStore.getAllAdmin();
          }
        })
        .catch(() => {
          ElMessage({
            message: 'Xóa sách không thành công !',
            type: 'danger',
            plain: true,
          });
        })
    },
    handleNavToDeTail(bookId) {
      this.$router.push(`/admin/book/${bookId}`);
    },
    handleNavToCreate() {
      this.$router.push(`/admin/book/create`);
    }
  }
}
</script>

<template>
  <main>
    <div class="content-main">
      <h1 class="title-page">Danh Mục Sách</h1>
      <div style="padding: 0 30px;">
        <div class="card mt-4 mb-4">
          <div class="card-header">
            <button @click="handleNavToCreate">Thêm Mới</button>
          </div>
          <div class="card-body">
            <table class="table table-hover table-sm">
              <thead>
                <tr>
                  <!-- <th><input type="checkbox" name="checkall" /></th> -->
                  <th>STT</th>
                  <th>Ảnh bìa</th>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Trạng thái</th>
                  <th>Số Quyển</th>
                  <th>Đã Mượn</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in bookStore.filterBook" :key="data._id">
                  <!-- <td><input type="checkbox" name="id" value="1" /></td> -->
                  <td>{{ index+1 }}</td>
                  <td><img :src="data.anhBia" :alt="data.tenSach" width="100px" /></td>
                  <td>{{ data.tenSach }}</td>
                  <td>{{ data.tacGia }}</td>
                  <td>
                    <span class="badge" :class="{
                      'badge-primary': handleStatus(data.soQuyen, data.soLuongDaMuon),
                      'badge-warning': handleStatus(data.soQuyen, data.soLuongDaMuon) == false,
                    }" style="cursor: default;">
                      {{ handleStatus(data.soQuyen, data.soLuongDaMuon) == true? "Còn hàng" : "Hết hàng" }}
                    </span>
                  </td>
                  <td><span style="padding-left: 20px;">{{ data.soQuyen }}</span></td>
                  <td><span style="padding-left: 20px;">{{ data.soLuongDaMuon }}</span></td>
                  <td>
                    <button class="btn btn-info btn-sm" @click="handleNavToDeTail(data._id)">
                      Chi tiết
                    </button>
                    <button class="btn btn-warning btn-sm ml-1">
                      Sửa
                    </button>
                    <button class="btn btn-sm ml-1 btn-danger" @click="handleDeleteBook(data._id)">
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>