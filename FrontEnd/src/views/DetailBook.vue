<script>
import { useBookStore } from "@/stores/book.store";
import { useBorrowStore } from "@/stores/borrow.store";
import { useUserStore } from "@/stores/user.store";
import { ElMessage, ElMessageBox } from "element-plus";
import handleLoading from "../helper/handleLoadingPage";

export default {

  props: {
    id: { type: String, require: true },
    // detailBook: {type: Object},
  },
  data() {
    return {
      bookStore: useBookStore(),
      borrowStore: useBorrowStore(),
      userStore: useUserStore(),
      bookDetail: null,
      soLuongMuon: 0,
    };
  },
  async created() {
    const id = this.id;
    this.bookDetail = await this.bookStore.detailBook(id);
    if (!this.bookDetail) {
      await this.bookStore.getAll().then(async() => {
        this.bookDetail = await this.bookStore.detailBook(id);
      })
    }
  },

  methods: {
    handleChangeQuantity(value) {
      this.soLuongMuon = value;
    },

    handleBorrow() {
      ElMessageBox.confirm(
        `Xác nhận mượn ${this.soLuongMuon} sách ${this.bookDetail.tenSach}`,
        {
          confirmButtonText: 'Xác Nhận',
          cancelButtonText: 'Hủy',
          type: 'warning',
          draggable: true,
        }
      )
        .then(async () => {
          const data = {
            maSach: this.bookDetail._id,
            soLuongMuon: this.soLuongMuon,
          };
          await this.borrowStore.create(data);
          if (this.borrowStore.statusCreate) {
            ElMessage({
              message: 'Gửi phiếu mượn thành công !',
              type: 'success',
              plain: true,
            });
            await this.bookStore.getAll();
            this.bookDetail = await this.bookStore.detailBook(this.bookDetail._id);
            await this.borrowStore.getAll();
          }
        })
        .catch(() => {
          ElMessage({
            showClose: true,
            message: 'Bạn đã hủy mượn sách.',
            type: 'warning',
          })
        })
    },
    // handleLoading() {
    //   const loading = ElLoading.service({
    //     lock: true,
    //     text: 'Đang tải',
    //     background: 'rgba(0, 0, 0, 0.3)',
    //   })
    //   setTimeout(() => {
    //     loading.close()
    //   }, 400);
    // }
  },
  mounted() {
    handleLoading();
  }
   
};
</script>


<template>
  <main>
    <div class="title-page"> 
      <p>THÔNG TIN</p> 
      <h3>TÁC PHẨM</h3>
    </div>
    <div v-if="bookDetail">
      <div class="product__info">
        <div class="container">
            <div class="row info-wrap">
                <div class="col-5 image__size">
                    <div class="product__image">
                        <img :src="bookDetail.anhBia" :alt="bookDetail.tenSach">
                    </div>
                </div>
                <div class="col-7">
                    <div class="product__content">
                        <h3 class="product__title">
                          {{bookDetail.tenSach}}   
                        </h3>
                        <div class="product_id-rate">
                            <div class="id-rate-left">
                                <span>Số lượng: {{ bookDetail.soQuyen - bookDetail.soLuongDaMuon }}</span>
                            </div>
                            <div class="id-rate-right">Mã: {{ bookDetail._id }}</div>
                        </div>
                        <div class="product__desc">
                          <span>Tác giả: {{ bookDetail.tacGia }}</span>
                          <span>NXB: {{ bookDetail.maNXB.tenNXB }}</span>
                          <span>Năm xuất bản: {{ bookDetail.namXuatBan }}</span>
                        </div>
                        <div class="product__price">
                            <span>{{ bookDetail.donGia }} VNĐ</span>
                        </div>
                        <div id="buy-amount">
                            <span class="buy-amount-title">Số lượng: </span>
                            <el-input-number v-model="soLuongMuon" :min="1" :max="bookDetail.soQuyen" @change="handleChangeQuantity" />
                        </div>

                        <div class="row">
                            <div class="product__btn">
                                <button @click="handleBorrow" class="col-lg-5 col-md-6 col-12 product--add-cart btn" :disabled="bookDetail.soQuyen==0">
                                    <i class="fa-solid fa-cart-plus"></i>
                                    Mượn sách
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>

    <div v-else class="main-message">
      <p>Đang tải thông tin sách...</p>
    </div>
  </main>
</template>
<style scoped>
.title-page {
  margin-bottom: 40px;
}
</style>