
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
]
</script>

<template>
  <div>
    <el-button @click="dialogTableVisible = true" class="btn btn-info button-info">
      Chi tiết
    </el-button>

    <el-dialog v-model="dialogTableVisible" title="Thông tin phiếu mượn" width="640">
      <!-- <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table> -->
      <div class="modal-borrow">
        <div class="row">
          <div class="col-5 modal-img">
            <img src="https://nhatrangbooks.com/wp-content/uploads/2019/10/015.u2377.d20160630.t155059-600x848.jpg" alt="">
          </div>
          <div class="col-7">
            <div class="mb-3">
              <span class="info-title">Đọc giả: </span>
              <span class="info-desc">Nguyen Van A</span>
            </div>
            <div class="mb-3">
              <span class="info-title">Tên sách: </span>
              <span class="info-desc">Nguyen Van A</span>
            </div>
            <div class="mb-3">
              <span class="info-title">Số lượng: </span>
              <span class="info-desc">Nguyen Van A</span>
            </div>
            <div class="mb-3">
              <span class="info-title">Ngày mượn: </span>
              <span class="info-desc">Nguyen Van A</span>
            </div>
            <div class="mb-3">
              <span class="info-title">Ngày trả: </span>
              <span class="info-desc">Nguyen Van A</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
