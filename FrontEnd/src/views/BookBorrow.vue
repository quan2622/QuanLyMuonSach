<script>
import { useBookStore } from "@/stores/book.store";
import { useBorrowStore } from "@/stores/borrow.store";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  data() {
    return {
      borrowStore: useBorrowStore(),
      bookStore: useBookStore(),
    }
  },

  async mounted() {
    if (!this.borrowStore.fetching) {
      await this.borrowStore.getAll();
    }
  }, 
  methods: {
    handleStatus(status) {
      return {
        waiting: "Chờ duyệt",
        borrowed: "Đang mượn",
        return: "Đã trả",
      }[status]     
    },
    handlDeleteBorrow(id) {
      ElMessageBox.confirm(
        `Xác nhận xóa phiếu mượn`,
        {
          confirmButtonText: 'Xác Nhận',
          cancelButtonText: 'Hủy',
          type: 'warning',
          draggable: true,
        }
      )
        .then(async() => {
          await this.borrowStore.delete(id);
          if (this.borrowStore.statusDelete) {
            ElMessage({
              message: 'Xóa phiếu mượn thành công !',
              type: 'success',
              plain: true,
            });
            await this.borrowStore.getAll();
            await this.bookStore.getAll();
          } else {
            ElMessage({
              message: 'Không thể xóa phiếu mượn !',
              type: 'danger',
              plain: true,
            });
          }
        })
        .catch(() => {
          ElMessage({
            showClose: true,
            message: 'Hủy hành động.',
            type: 'warning',
          })
        })
    },
    handleNavToDetail(bookId) {
      this.$router.push(`/book/${bookId}`);
    }
  }

}
</script>

<template>
  <main class="container">
    <h1 class="text-center m-4">Danh sách phiếu mượn sách</h1>

    <div class="card mb-3">
      <div class="card-header">
        Danh sách
        <span class="header-note">Vui lòng đọc kỹ phần chú ý bên dưới nhé!</span>
      </div>
      <div class="card-body">
        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th class="space_index">STT</th>
              <th>Ảnh bìa</th>
              <th>Tên sách</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày mượn</th>
              <th>Ngày trả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in borrowStore.formatDateTime" :key="data._id" :class="{'table-active': data.trangThai === 'borrowed'}">
              <td class="space_index">{{ index+1 }}</td>
              <td>
                <img class="anhBia_borrow" :src="data.maSach?.anhBia" alt="Sản phẩm" width="100px" @click="handleNavToDetail(data.maSach._id)" />
              </td>
              <td class="tensach_borrow" @click="handleNavToDetail(data.maSach._id)">{{ data.maSach.tenSach }}</td>
              <td style="width: 120px; text-align: center;">
                {{ data.soLuongMuon }}
              </td>
              <td class="price_borrow">{{ data.maSach.donGia*data.soLuongMuon }} VNĐ</td>
              <td>
                <span :class="{
                  'badge': true,
                  'badge-secondary': data.trangThai === 'waiting',
                  'badge-info': data.trangThai === 'borrowed',
                  'badge-success': data.trangThai === 'return'
                }">
                  {{ handleStatus(data.trangThai) }}
                </span>
              </td>
              <td>{{ data.ngayMuon }}</td>
              <td>{{ data.ngayTra }}</td>
              <td>
                <button class="btn btn-sm ml-1" 
                :class="{
                  'btn-secondary': data.trangThai === 'borrowed',
                  'btn-danger': data.trangThai === 'waiting' || data.trangThai === 'return'
                }" 
                :disabled="data.trangThai === 'borrowed'"
                @click="handlDeleteBorrow(data._id)">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mb-3">
      <div class="note-title">*Chú ý:</div>
      <div class="note-borrow">
        <ol>
          <li>Thời gian mượn sách tối đa là <strong><i>5 ngày</i></strong> kể từ ngày mượn.</li>
          <li>Vui lòng thanh toán <strong><i>tiền mượn</i></strong> khi nhận sách tại quầy.</li>
          <li>Khi đăng ký phiếu mượn chỉ có hiệu lực trong ngày.</li>
        </ol>
      </div>
    </div>
  </main>
</template>
<style scoped>
.price_borrow {
  font-weight: 500;
  color: #ce1212;
}

.header-note {
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid #ce1212;
  font-size: 17px;
  font-weight: 500;
}

.note-title {
  font-size: 18px;
  font-weight: 600;
  color: #ce1212;
}
.note-borrow {
  font-size: 18px;
}

.tensach_borrow {
  width: 200px;
  white-space: pre-wrap;
}

.anhBia_borrow, .tensach_borrow {
  cursor: pointer;
}
</style>

