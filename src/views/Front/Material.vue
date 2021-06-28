<template>
  <div class="container">
    <PageTitle :path="require('@/assets/images/page-title2.png')" >建材 - {{ category }}</PageTitle>
    <div class="row mh-wrapper">
     <div class="col-12">
      <Menu :active="'建材'"></Menu>
     </div>
     <div class="col-12 py-3">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4"  v-for="item in productResult" :key="item.id">
          <ProductCard :data="item" :category="category" :categoryMain="'material'"></ProductCard>
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
  name: 'Material',
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
      const kind = to.params.material
      this.category = kind
      this.getProductByCategory()
    }
  },
  methods: {
    getProductByCategory (page = 1) {
      switch (this.category) {
        case '大理石':
          this.productFilter = this.productAll.filter((item) => item.category === '大理石')
          break
        case '木皮':
          this.productFilter = this.productAll.filter((item) => item.category === '木皮')
          break
        case '表面材':
          this.productFilter = this.productAll.filter((item) => item.category === '表面材')
          break
        case '磁磚':
          this.productFilter = this.productAll.filter((item) => item.category === '磁磚')
          break
      }
      const result = this.$pagination(this.productFilter, this.productResult, page)
      this.pageItem = result[0]
      this.productResult = result[1]
    },
    goToPage (page) {
      const result = this.$pagination(this.productFilter, this.productResult, page)
      this.pageItem = result[0]
      this.productResult = result[1]
    }
  },
  created () {
    const category = this.$route.params.material
    this.category = category
    this.emitter.emit('cartVisible', true)
    this.getProductAll()
  }
}
</script>
