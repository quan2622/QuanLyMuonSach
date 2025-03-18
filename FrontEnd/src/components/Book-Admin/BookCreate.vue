<script>
import CreateBook from "@/components/from/CreateForm.vue"

export default {
  components: {
    CreateBook,
  },
  data() {
    return {
      book: {},
    }
  },
  methods: {
    handleNavToLogIn() {
      this.$router.push("/login");
    }
  }
}
</script>

<template>
  <main class="main-right">
    <div class="content-main ad-form">
      <h1 class="title-page">Thêm Thông Tin Sách Mới</h1>
      <CreateBook :book="book"></CreateBook>
    </div>
  </main>
</template>