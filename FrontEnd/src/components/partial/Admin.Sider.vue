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
    }
  }
}
</script>

<template>
  <main>
    <div class="sider">
        <div class="inner-menu">
          <ul>
            <li @click="NavToProfile">Admin</li>
            <li @click="NavToCategoryBook">Danh Mục Sách</li>
            <li @click="NavToCategoryBorrow">Danh Mục Phiếu Mượn</li>
          </ul>
        </div>
      </div>
  </main>
</template>