<script>
import { useBookStore } from "@/stores/book.store";
import CardItem from "@/components/home/CardItem.vue"

export default {
  name: "BookList",
  components: {
    CardItem,
  },
  data() {
    return {
      bookStore: useBookStore()
    }
  },
  computed: {
    handleFilter() {
      return this.bookStore.filterBook.filter(book => book.soQuyen > 0);
    }
  }
}
</script>

<template>
  <main>
    <div class="title-page"> 
      <p>DANH SÁCH</p> 
      <h3>TÁC PHẨM</h3>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 box-search-user"> 
          <input type="text" placeholder="Nhập tên sách" @input="bookStore.handleChangeTxtSearch($event.target.value)">
        </div>
      </div>
    </div>
    <div class="good_container container">
      <div class="row">
        <CardItem v-for="book in handleFilter" :key="book._id" :data="book"></CardItem>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>