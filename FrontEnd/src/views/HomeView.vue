<script>
import { useBookStore } from "@/stores/book.store";
import  BookList from "@/components/home/ListCard.vue"


export default {
  data() {
    return {
      bookStore: useBookStore(),
    };
  },
  components: {
    BookList,
  },
  async mounted() {
    if (!this.bookStore.fetching) {
      await this.bookStore.getAll();
    }
  },
};
</script>


<template>
  <main style="margin-top: 2rem;">
    <BookList></BookList>
  </main>
</template>
