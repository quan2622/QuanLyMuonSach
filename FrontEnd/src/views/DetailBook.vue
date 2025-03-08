<script>
import { useBookStore } from "@/stores/book.store";
import { useBorrowStore } from "@/stores/borrow.store";
import { useUserStore } from "@/stores/user.store";
import { ElMessage, ElMessageBox } from "element-plus";


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
    console.log(id);
    this.bookDetail = await this.bookStore.detailBook(id);
    if (!this.bookDetail) {
      await this.bookStore.getAll().then(() => {
        this.bookDetail = this.bookStore.detailBook(id);
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
    }
  }
   
};
</script>


<template>
  <main>
    <div class="title-page"> 
      <p>THÔNG TIN</p> 
      <h3>TÁC PHẨM {{ this.userStore.user._id }}</h3>
    </div>
    <div>
      <div class="product__info">
        <div class="container">
            <div class="row info-wrap">
                <div class="col-5 image__size">
                    <div class="product__image">
                        <!-- Swiper -->
                        <img :src="bookDetail.image" :alt="bookDetail.tenSach">
                    </div>
                </div>
                <div class="col-7">
                    <div class="product__content">
                        <h3 class="product__title">
                          {{bookDetail.tenSach}}   
                        </h3>
                        <div class="product_id-rate">
                            <div class="id-rate-left">
                                <span>Số lượng: {{ bookDetail.soQuyen }}</span>
                            </div>
                            <div class="id-rate-right">Mã: {{ bookDetail._id }}</div>
                        </div>
                        <div class="product__desc">
                          <span>Tác giả: {{ bookDetail.tacGia }}</span>
                          <span>NXB: {{ bookDetail.maNXB.tenNXB }}</span>
                          <span>Năm xuất bản: {{ bookDetail.namXuatBan }}</span>
                        </div>
                        <div class="product__price">
                            <span>{{ bookDetail.donGia }} đ</span>
                        </div>
                        <div id="buy-amount">
                            <span class="buy-amount-title">Số lượng: </span>
                            <el-input-number v-model="soLuongMuon" :min="1" :max="10" @change="handleChangeQuantity" />
                        </div>

                        <div class="row">
                            <div class="product__btn">
                                <!-- <button @click="handleBorrow" class="col-lg-5 col-md-6 col-12 product--add-cart">
                                    <i class="fa-solid fa-cart-plus"></i>
                                    Mượn sách
                                </button> -->
                                <button @click="handleBorrow" class="col-lg-5 col-md-6 col-12 product--add-cart">
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
  </main>
</template>
