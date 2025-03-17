<script>
import { usePublisherStore } from "@/stores/publisher.store";
import { ElMessage } from "element-plus";

export default {
  props: {
    publisher: { type: Object, required: false },
    id: {type: String, required: false},
  },
  data() {
    return {
      publisherStore: usePublisherStore(),
    }
  },
  computed: {
    isCreate() {
      return ( this.$route.name == 'publisher-create');
    },
  },
  methods: {
    async handleSubmit() {
      if (this.isCreate) {
        await this.publisherStore.create(this.publisher);
      } else {
        await this.publisherStore.update(this.id, this.publisher);
      }
      if (this.publisherStore.statusCreate || this.publisherStore.statusUpdate) {
        ElMessage({
          message: 'Cập nhật Nhà xuất bản thành công !',
          type: 'success',
          plain: true,
        });
        await this.publisherStore.getAll();
        this.$router.push("/admin/publisher-category");
      } else {
        ElMessage({
          message: 'Cập nhật không thành công !',
          type: 'error',
          plain: true,
        })
      }
    }
  }
}
</script>


<template>
  <form
    @submit.prevent="handleSubmit"
    style="padding: 0 30px"
    enctype="application/json"
  >
    <div class="mb-3">
      <label for="tenSach" class="form-label">Tên Nhà xuất bản:</label>
      <input
        type="text"
        class="form-control"
        id="tenSach"
        v-model="publisher.tenNXB"
        required
      />
    </div>
    <div class="mb-3">
      <label for="tenSach" class="form-label">Địa chỉ:</label>
      <textarea
        type="text"
        class="form-control inputDiaChi"
        id="tenSach"
        v-model="publisher.diaChi"
        required
      ></textarea>
    </div>
    <div class="d-flex">
      <button v-if="isCreate" type="submit" class="btn btn-primary btnSignUp" @click="handleCreate">
        Tạo mới
      </button>
      <button v-else type="submit" class="btn btn-warning btnSignUp" @click="handleEdit">
        Cập nhật
      </button>
    </div>
  </form>
</template>

<style scoped>
.inputDiaChi {
  height: 100px;
}
</style>
