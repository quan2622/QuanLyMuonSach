<script>
export default {
  methods: {
    NavToCategoryBook() {
      this.$router.push("/admin/book-category");
    },
    NavToCategoryBorrow() {
      this.$router.push("/admin/borrow-category");
    },
    NavToProfile() {
      this.$router.push("/admin/profile");
    },
    NavToPublisher() {
      this.$router.push("/admin/publisher-category");
    },
  }
}
</script>

<template>
  <main class="box-sider">
    <div class="sider">
        <div class="inner-menu">
          <ul>
            <li @click="NavToProfile">Admin</li>
            <li @click="NavToCategoryBorrow">Danh Mục Phiếu Mượn</li>
            <li @click="NavToCategoryBook">Danh Mục Sách</li>
            <li @click="NavToPublisher">Danh Mục Nhà Xuất Bản</li>
          </ul>
        </div>
      </div>
  </main>
</template>