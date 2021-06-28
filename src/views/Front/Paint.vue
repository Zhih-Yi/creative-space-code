<template>
  <div class="container">
    <PageTitle :path="require('@/assets/images/page-title5.png')" >壁紙/塗料 - {{ category }}</PageTitle>
    <div class="row mh-wrapper">
      <div class="col-12">
        <Menu :active="'壁紙/塗料'"></Menu>
      </div>
      <div class="col-12 py-3">
        <div class="row">
          <div class="col-sm-6 col-md-4 col-lg-3 mb-4"  v-for="item in productResult" :key="item.id">
            <ProductCard :data="item" :category="category" :categoryMain="'paint'"></ProductCard>
          </div>
        </div>
        <div class="row">
          <div class="col-12 py-3">
            <Pagination :pageItem="pageItem" :data="productFilter" @changePage="goToPage"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/Front/PageTitle.vue'
import Menu from '@/components/Front/Menu.vue'
import ProductMixin from '@/mixin/ProductMixin.js'
import ProductCard from '@/components/Front/ProductCard.vue'
import Pagination from '@/components/Share/Pagination.vue'

export default {
  name: 'Paint',
  components: {
    PageTitle,
    Menu,
    ProductCard,
    Pagination
  },
  mixins: [ProductMixin],
  inject: ['emitter'],
  data () {
    return {
      category: '',
      productAll: [],
      productFilter: [],
      productResult: [],
      pageItem: {}
    }
  },
  watch: {
    $route (to, from) {
      const kind = to.params.paint
      this.category = kind
      this.getProductByCategory()
    }
  },
  methods: {
    getProductByCategory (page = 1) {
      switch (this.category) {
        case '壁紙':
          this.productFilter = this.productAll.filter((item) => item.category === '壁紙')
          break
        case '油漆':
          this.productFilter = this.productAll.filter((item) => item.category === '油漆')
          break
        case '特殊漆':
          this.productFilter = this.productAll.filter((item) => item.category === '特殊漆')
          break
      }
      const result = this.$pagination(this.productFilter, this.productResult, page)
      this.pageItem = result[0]
      this.productResult = result[1]
    },
    goToPage (page) {
      const result = this.$pagination(this.productFilter, this.productResult, page)
      this.pageItem = result
    }
  },
  created () {
    const category = this.$route.params.paint
    this.category = category
    this.emitter.emit('cartVisible', true)
    this.getProductAll()
  }
}
</script>
