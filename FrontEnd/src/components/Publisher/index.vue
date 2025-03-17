<script>
import { usePublisherStore } from "@/stores/publisher.store";
import { ElMessage, ElMessageBox } from "element-plus";
import moment from "moment";

export default {
  data() {
    return {
      publisherStore: usePublisherStore(),
    }
  },
  async mounted() {
    if (!this.publisherStore.fetch)
    {
      await this.publisherStore.getAll();
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("HH:mm - DD/MM/YYYY")
    },
    handleDelete(publisherId) {
      ElMessageBox.confirm(
        'Xác nhận xóa thông tin Nhà xuất bản',
        {
          confirmButtonText: 'Xác Nhận',
          cancelButtonText: 'Hủy',
          type: 'warning',
          draggable: true,
        }
      )
        .then(async () => {
          await this.publisherStore.deletePublisher(publisherId);
          if (this.publisherStore.statusDelete) {
            ElMessage({
              message: 'Xóa Nhà xuất bản thành công !',
              type: 'success',
              plain: true,
            });
            await this.publisherStore.getAll();
          }
        })
        .catch(() => {
          ElMessage({
            message: 'Xóa không thành công !',
            type: 'danger',
            plain: true,
          });
        })
    },
    handleNavToCreate() {
      this.$router.push("/admin/publisher-category/create");
    },
    handleNavToEdit(publisherId) {
      this.$router.push(`/admin/publisher-category/edit/${publisherId}`);
    },
  }
}
</script>

<template>
  <main>
    <div class="content-main">
      <h1 class="title-page">Danh Mục Nhà Xuất Bản</h1>
      <div style="padding: 0 30px">
        <div class="card mt-4 mb-4">
          <div class="card-header">
            <input
              class="box-search"
              type="text"
              placeholder="Nhập tên nhà xuất bản"
              @input="publisherStore.handleChangeTxtSearch($event.target.value)"
            />
            <button class="btn btn-primary addPublisher" @click="handleNavToCreate">Thêm mới</button>
          </div>
          <div class="card-body">
            <table class="table table-hover table-sm">
              <thead>
                <tr>
                  <!-- <th>ID</th> -->
                  <th>Tên NXB</th>
                  <th>Địa chỉ</th>
                  <th>Ngày chỉnh sửa thông tin</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="data in publisherStore.filterPublisher"
                  :key="data._id"
                >
                  <!-- <td><input type="checkbox" name="id" value="1" /></td> -->
                  <!-- <td>{{ data._id }}</td> -->
                  <td>{{ data.tenNXB }}</td>
                  <td class="limit-char">
                    {{ data.diaChi }}
                  </td>
                  <td>{{ formatDate(data.updatedAt) }}</td>
                  <td>
                    <button class="btn btn-sm ml-1 btn-warning" @click="handleNavToEdit(data._id)">
                      Chỉnh sửa
                    </button>
                    <button
                      class="btn btn-sm ml-1 btn-danger"
                      @click="handleDelete(data._id)"
                    >
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
