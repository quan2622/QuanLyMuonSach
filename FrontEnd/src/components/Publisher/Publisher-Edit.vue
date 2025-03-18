<script>
import { usePublisherStore } from "@/stores/publisher.store";
import PublisherForm from "../from/Publisher-Form.vue";

export default {
  components: {
    PublisherForm
  },
  props: {
    id: {type: String, required: true},
  },
  data() {
    const publisher = usePublisherStore().detailPublisher(this.id);
    return {
      publisher,
    }
  }
}
</script>

<template>
  <main class="main-right">
    <div class="content-main ad-form">
      <h1 class="title-page">Thêm Thông Tin Nhà Xuất Bản Mới</h1>
      <PublisherForm :publisher="publisher" :id="id"></PublisherForm>
    </div>
  </main>
</template>