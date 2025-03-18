<script>
import CreateBook from "@/components/from/CreateForm.vue"
import { useBookStore } from "@/stores/book.store";

export default {
  components: {
    CreateBook,
  },
  props: {
    id: {type: String, required: true},
  },
  data() {
    const book = useBookStore().detailBook(this.id);
    console.log(book);
    return {
      book,
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
      <h1 class="title-page">Chỉnh sửa thông tin sách</h1>
      <CreateBook :book="book" :id="id"></CreateBook>
    </div>
  </main>
</template>