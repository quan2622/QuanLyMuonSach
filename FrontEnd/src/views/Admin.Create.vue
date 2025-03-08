<script>
import CreateBook from "@/components/from/CreateForm.vue"

export default {
  components: {
    CreateBook,
  },
  methods: {
    handleNavToLogIn() {
      this.$router.push("/login");
    }
  }
}
</script>

<template>
  <main>
    <div class="content-main ad-form">
      <h1 class="title-page">Thêm Thông Tin Sách Mới</h1>
      <CreateBook></CreateBook>
    </div>
  </main>
</template>