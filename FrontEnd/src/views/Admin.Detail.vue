<script>
import { useBookStore } from "@/stores/book.store";


export default {
  props: {
    id: {type: String, require: true},
  },
  data() {
    return {
      bookStore: useBookStore(),
      detailBook: {},
    }
  },
  async created() {
    this.detailBook = await this.bookStore.detailBook(this.id);
    if (!this.detailBook) {
      await this.bookStore.getAllAdmin().then(() => {
        this.detailBook = this.bookStore.detailBook(this.id);
      })
    }
  }
}
</script>

<template>
  <main>
    <div class="content-main">
      <!-- <h1 class="title-page">Thông Tin Sách</h1> -->
      <div class="profile-contain mt-4">
        <div class="row">
          <div class="col-4">
            <div class="avatar">
              <img src="https://intamphuc.vn/wp-content/uploads/2023/06/mau-bia-sach-dep-2.jpg" :alt="detailBook.tenSach" class="img-book">
              <!-- <h2>Tựa sách</h2> -->
            </div>
          </div>
          <div class="col-8">
            <div class="info-book">
              <h2>Thông tin sách</h2>
              <div class="row content">
                <div class="col-4 title-option"><span>Tên:</span> {{ detailBook.tenSach }}</div>
                <div class="col-8 option"><span>Mã sách:</span> {{ detailBook._id }}</div>
              </div>
              <div class="row mt-3 content">
                <div class="col-4 title-option"> <span>Tác giả:</span> {{ detailBook.tacGia }}</div>
                <div class="col-8 option"> <span>Nhà xuất bản:</span> {{ detailBook.maNXB.tenNXB }}</div>
              </div>
              <div class="row mt-3 content">
                <div class="col-4 title-option"> <span>Đơn giá:</span> {{ detailBook.donGia }}</div>
                <div class="col-8 option"> <span>Năm xuất bản:</span> {{ detailBook.namXuatBan }}</div>
              </div>
              <div class="row mt-3 content">
                <div class="col-4 title-option"> <span>Số quyển hiện có:</span> {{ detailBook.soQuyen }}</div>
                <div class="col-8 option"> <span>Số quyển đã mượn:</span> {{ detailBook.soLuongDaMuon }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>