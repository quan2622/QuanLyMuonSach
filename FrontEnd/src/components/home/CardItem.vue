<script>
export default {
  name: 'CardItem',
  props: {
    data: {type: Object, require: true},
  },
  methods: {
    navigaToDetail() {
      this.$router.push(`/book/${this.data._id}`)
    },
  },
}
</script>

<template>
  <div class="col-xl-3 col-lg-3 col-md-6 col-6" style="margin-bottom: 15px">
    <div class="inner-item-product">
      <div class="item-image">
        <img :src="data.anhBia" alt="image-book" />
        <div class="product-button">
          <div class="button-item">
            <span @click="navigaToDetail()">
              <i class="fa-solid fa-eye"></i>
              <i class="ml-1">Xem chi tiết</i>
            </span>
          </div>
        </div>
      </div>
      <div class="inner-content">
        <h3 class="inner-title">{{ data.tenSach }}</h3>
        <i>{{ data.tacGia }}</i>

        <div class="inner-price">
          <div class="current-price">{{ data.donGia }}</div>
        </div>
        <div class="product-footer">
          <span class="product-center">{{ data.soLuongDaMuon }} đã mượn</span>
        </div>
      </div>
    </div>
  </div>
</template>
