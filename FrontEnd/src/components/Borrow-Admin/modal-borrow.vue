<script>
import formatDate from "@/helper/formatDate";
import { statusHandler } from "@/helper/handleStatusBorrow";

export default {
  props: {
    data: {type: Object, required: true},
  },
  data() {
    return {
      dialogTableVisible: false,
    }
  },
  methods: {
    formatDate(Date) {
      return formatDate(Date);
    },
    getStatus(status) {
      return statusHandler.getStatus(status);
    }
  }
}
</script>

<template>
  <div>
    <el-button @click="dialogTableVisible = true" class="btn btn-info button-info">
      Chi tiết
    </el-button>

    <el-dialog v-model="dialogTableVisible" width="800">
      <div class="modal-borrow">
        <div class="row">
          <div class="col-5 modal-img">
            <img :src="data.maSach?.anhBia" :alt="data.maSach?.tenSach">
          </div>
          <div class="col-7">
            <div class="mb-3 pl-2 pr-3 modal-borderBottom">
              <span class="info-title">Đọc giả: </span>
              <span class="info-desc">{{ `${data.maDocGia?.hoLot} ${data.maDocGia?.ten}`}}</span>
            </div>
            <div class="mb-3 pl-2 pr-3 modal_tenSach">
              <span class="info-title">Tên sách: </span>
              <span class="info-desc">{{ data.maSach?.tenSach }}</span>
            </div>
            <div class="mb-3 pl-2 pr-3">
              <span class="info-title">Số lượng: </span>
              <span class="info-desc">{{ data.soLuongMuon }}</span>
            </div>
            <div class="mb-3 pl-2 pr-3">
              <span class="info-title">Tổng tiền: </span>
              <span class="info-desc price_borrow">{{ data.soLuongMuon*data.maSach?.donGia }}</span>
            </div>
            <div class="mb-3 pl-2 pr-3 modal-borderBottom">
              <span class="info-title">Trạng thái: </span>
              <span class="info-desc">{{ getStatus(data.trangThai) }}</span>
            </div>
            <div class="mb-3 pl-2 pr-3">
              <span class="info-title">Ngày mượn: </span>
              <span class="info-desc">{{ formatDate(data.ngayMuon) }}</span>
            </div>
            <div class="mb-3 pl-2 pr-3">
              <span class="info-title">Ngày trả: </span>
              <span class="info-desc">{{ formatDate(data.ngayTra) }}</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Hủy</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.dialog-footer button:hover {
  background: #ce1212;
  color: #fff;
  outline: none;
}
.price_borrow {
  font-weight: 500;
  color: #ce1212;
}

</style>
