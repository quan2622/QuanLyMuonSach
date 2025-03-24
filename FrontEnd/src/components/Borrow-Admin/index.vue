<script>
import { useBorrowStore } from "@/stores/borrow.store";
import ModalBorrow from "./modal-borrow.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import formatDate from "@/helper/formatDate";
import { statusHandler } from "@/helper/handleStatusBorrow";

export default {
  components: {
    ModalBorrow,
  },
  data() {
    return {
      borrowStore: useBorrowStore(),
      statusFilter: "",
    }
  },
  async mounted() {
    if (!this.borrowStore.fetching) {
      await this.borrowStore.getAllAdmin();
      console.log(this.borrowStore.dataBorrow);
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date);
    },
    getStatusClass(status) {
      return statusHandler.getStatusClass(status);
    },
    getStatus(status) {
      return statusHandler.getStatus(status);
    },
    async changeStatus(borrowId, status, borrowPrice) {
      if (status == "return") {
        ElMessage({
          message: 'Không thể thay đổi!',
          type: 'warning',
          plain: true,
        });
        return;
      } else {
        let dataAPI = {
          maPhieuMuon: borrowId,
        };

        if (status == "waiting") dataAPI.trangThai = "borrowed";
        else dataAPI.trangThai = "return";

        try {
          if (status == 'waiting') {
            await this.showConfirmMessage(`Thu tiền thuê ${borrowPrice} VNĐ !`);
          } else if (status == "borrowed") {
            await this.showConfirmMessage("Xác nhận hoàn tất trả sách");
          };

          await this.borrowStore.updateStatusAdmin(dataAPI);
          await this.borrowStore.getAllAdmin();
        } catch (error) {
          ElMessage({
            message: 'Đã hủy thao tác!',
            type: 'warning',
            plain: true,
          })  
        }
      }
    },
    showConfirmMessage(message) {
      return ElMessageBox.confirm(
        message,
        'Nhắc nhở',
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "warning",
        }
      )
    },
    handleDelete(borrowId, status) {
      ElMessageBox.confirm(
        'Xác nhận xóa thông tin phiếu mượn',
        {
          confirmButtonText: 'Xác Nhận',
          cancelButtonText: 'Hủy',
          type: 'warning',
          draggable: true,
        }
      )
        .then(async () => {
          await this.borrowStore.deleteAdmin(borrowId);
          if (this.borrowStore.statusDelete) {
            ElMessage({
              message: 'Xóa Phiếu mượn thành công !',
              type: 'success',
              plain: true,
            });
            await this.borrowStore.getAllAdmin();
          } else {
            ElMessage({
              message: 'Không thể xóa phiếu mượn !',
              type: 'error',
              plain: true,
            });
          }
        });
    },
    handleBtnDelete(status) {
      return status == "borrowed" ? "disabled" : "";
    },
  },
  computed: {
    borrowFilterStatus() {
      if (this.statusFilter) {
        return this.borrowStore.filterBorrowId.filter((data) => data.trangThai == this.statusFilter);
      }
      return this.borrowStore.filterBorrowId;
    }
  }
}
</script>

<template>
  <main class="main-right">
    <div class="content-main">
      <h1 class="title-page">Danh Mục Phiếu Mượn</h1>
      <div style="padding: 0 30px">
        <div class="card mt-4 mb-4">
          <div class="card-header">
            <input
              class="box-search"
              type="text"
              placeholder="Nhập ID hoặc tên người dùng"
              @input="borrowStore.handleChangeTxtSearch($event.target.value)"
            />
            <div class="box-filter">
              <label for="boxFilter">Bộ lọc:</label>
              <select v-model="statusFilter" id="boxFilter">
                <option value="">--Tất cả--</option>
                <option value="waiting">Đang chờ</option>
                <option value="borrowed">Đang mượn</option>
                <option value="return">Đã trả</option>
              </select>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-hover table-sm">
              <thead>
                <tr>
                  <th>ID Phiếu mượn</th>
                  <th>Người mượn</th>
                  <th>Tên sách</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in borrowFilterStatus" :key="data._id">
                  <td>{{ data._id }}</td>
                  <td> {{ `${data.maDocGia.hoLot} ${data.maDocGia.ten}` }}</td>
                  <td class="limit-char tenSach_index">{{ data.maSach.tenSach }}</td>
                  <td>{{ data.soLuongMuon }}</td>
                  <td>
                    <a :class="getStatusClass(data.trangThai)" href="javascript:;" @click="changeStatus(data._id, data.trangThai, data.soLuongMuon*data.maSach?.donGia)">
                      {{ getStatus(data.trangThai) }}
                    </a>
                  </td>
                  <td>{{ formatDate(data?.ngayMuon) }}</td>
                  <td>{{ formatDate(data?.ngayTra) }}</td>
                  <td class="d-flex">
                    <ModalBorrow :data="borrowStore.detailBorrow(data._id)"></ModalBorrow>
                    <a class="btn btn-sm ml-1 btn-danger" :class="handleBtnDelete(data.trangThai)"  @click="handleDelete(data._id, data.trangThai)">
                      Xóa
                    </a>
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

<style scoped>
.btn-status {
  font-size: 12px;
  padding: 3px 0;
  width: 80px;
  border-radius: 50px;
}
</style>
