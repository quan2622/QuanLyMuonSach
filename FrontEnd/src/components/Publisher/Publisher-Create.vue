<script>
import PublisherForm from "../from/Publisher-Form.vue";

export default {
  components: {
    PublisherForm
  },
  data() {
    return {
      publisher: {},
    }
  }
}
</script>

<template>
  <main>
    <div class="content-main ad-form">
      <h1 class="title-page">Thêm Thông Tin Nhà Xuất Bản Mới</h1>
      <PublisherForm :publisher="publisher"></PublisherForm>
    </div>
  </main>
</template>