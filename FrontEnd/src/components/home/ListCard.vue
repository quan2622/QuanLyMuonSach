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
        <CardItem v-for="book in bookStore.filterBook" :key="book._id" :data="book"></CardItem>
      </div>
    </div>
  </main>
  <!-- <div class="container">
    <div class="row">
      <input
        type="text"
        placeholder="Nhập tên sách cần tìm kiếm"
        @input="(event) => bookStore.handleChangeTxtSearch(event.target.value)"/>
    </div>
    <div class="row mt-2">
      <div class="card col-md-3 mt-3" v-for="book in bookStore.filterBook" :key="book._id" >
        <img class="card-img-top" src="https://img1.od-cdn.com/ImageType-400/2497-1/0B5/1C4/E6/%7B0B51C4E6-3B22-4BC9-8D9F-0DCAF12CF7E8%7DImg400.jpg" alt="Card image cap"/>
        <div class="card-body">
          <h4 class="card-title">{{ book.tenSach }}</h4>
          <i>{{ book.tacGia }}</i>
          <h5>{{ book.donGia }}</h5>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped>

</style>