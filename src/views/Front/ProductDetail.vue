<template>
  <div class="container">
    <div class="row mh-wrapper">
      <div class="col-md-12 py-3">
        <a href="#" @click.prevent="historyBack"><i class="bi bi-arrow-left h1"></i></a>
      </div>
      <div class="col-md-5 py-3">
        <img :src="currentProduct.imageUrl" :alt="currentProduct.title" class="detail-img">
      </div>
      <div class="col-md-7 py-3 d-flex flex-column justify-content-between" v-cloak>
        <p class="h5 py-1"><span class="badge bg-dark rounded-pill">{{ currentProduct.category }}</span></p>
        <h1 class="h3 py-1">{{ currentProduct.title }}</h1>
        <div class="title-line mb-3"></div>
          <p class="text-card-gray-text">型號: {{ currentProduct.description }}</p>
          <p class="d-flex align-items-center"><span v-if="currentProduct.origin_price != currentProduct.price" class="me-2 badge rounded-pill bg-success">特價</span>
          <del class="me-5" v-if="currentProduct.origin_price != currentProduct.price">{{ $filters.currency(currentProduct.origin_price) }}</del>
          <span class="h4 text-danger" v-if="currentProduct.price">{{ $filters.currency(currentProduct.price) }}/{{ currentProduct.unit }}</span></p>
          <div class="input-number-group input-group">
            <button type="button" @click="currentProduct.num = minusQuantity(currentProduct.num)" class="btn minus border border-2 border-dark btn-outline-dark"><i class="bi bi-dash-lg"></i></button>
            <input type="number" v-model.number="currentProduct.num" class="text-center input-number h-100 rounded-0" @change="currentProduct.num = verifyNumber(currentProduct.num)">
            <button type="button" @click="currentProduct.num = addQuantity(currentProduct.num)" class="btn add border border-2 border-dark btn-outline-dark"><i class="bi bi-plus-lg"></i></button>
          </div>
          <div class="pt-3">
            <button type="button" @click="saveFavorite" class="btn btn-outline-dark me-3"><i class="fas fa-heart fa-lg me-2"></i>加入收藏</button>
            <button type="button" @click="addToCart(currentProduct)" class="btn btn-major"><i class="fas fa-shopping-cart fa-lg me-2"></i>加入購物車</button>
          </div>
      </div>
      <div class="col-12 py-3">
        <h3><i class="fas fa-info-circle me-2"></i>產品資訊</h3>
        <div class="line-info mb-3"></div>
        <p><pre class="fs-6">{{ currentProduct.content }}</pre></p>
      </div>
      <div class="col-md-12">
       <div class="row justify-content-center py-3">
          <div class="col-md-8 col-lg-6">
          <swiper :style="{'--swiper-navigation-color': 'rgba(255,255,255,0.6)'}" :loop="true" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }" class="swiper-product">
            <template v-for="item in currentProduct.imagesUrl" :key="item">
              <swiper-slide v-if="item">
                <img v-lazy="item" class="detail-display-img"/>
              </swiper-slide>
            </template>
          </swiper>
          <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="5" :freeMode="true" :watchSlidesVisibility="true" :watchSlidesProgress="true" class="swiper-item py-2">
            <template v-for="item in currentProduct.imagesUrl" :key="item">
              <swiper-slide v-if="item">
                <img :src="item" class="detail-display-imgitem" />
              </swiper-slide>
            </template>
          </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SwiperCore, { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/thumbs/thumbs.min.css'
import { addQuantity, minusQuantity, verifyNumber } from '@/methods/cart.js'
SwiperCore.use([Navigation, Thumbs])

export default {
  name: 'ProductDetail',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      productId: '',
      currentProduct: {},
      thumbsSwiper: null
    }
  },
  inject: ['emitter'],
  methods: {
    addQuantity,
    minusQuantity,
    verifyNumber,
    historyBack () {
      const { category, categoryMain } = this.$route.query
      if (!category || !categoryMain) {
        this.$router.go(-1)
      } else {
        this.$router.push(`/product/${categoryMain}/${category}`)
      }
    },
    getProductDetail () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/product/${vm.productId}`
      vm.emitter.emit('loading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.currentProduct = { ...res.data.product, num: 1 }
          vm.imgs = [...this.currentProduct.imagesUrl]
        } else {
          vm.emitter.emit('push-message', {
            style: 'danger',
            title: '錯誤通知',
            content: res.data.message,
            icon: 'fas fa-exclamation-circle'
          })
        }
        vm.emitter.emit('loading', false)
      }).catch((err) => {
        vm.emitter.emit('push-message', {
          style: 'danger',
          title: '錯誤通知',
          content: err,
          icon: 'fas fa-exclamation-circle'
        })
        vm.emitter.emit('loading', false)
      })
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    saveFavorite () {
      const favoriteList = JSON.parse(window.localStorage.getItem('favorite')) || []
      const id = this.currentProduct.id
      if (favoriteList.indexOf(id) === -1) {
        favoriteList.push(id)
        window.localStorage.setItem('favorite', JSON.stringify(favoriteList))
        this.emitter.emit('push-message', {
          style: 'success',
          title: '訊息通知',
          content: '收藏成功',
          icon: 'fas fa-check-circle'
        })
      } else {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '錯誤通知',
          content: '加入失敗，收藏已存在',
          icon: 'fas fa-exclamation-circle'
        })
      }
    },
    addToCart (item) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`
      const data = { product_id: item.id, qty: item.num }
      vm.emitter.emit('loading', true)
      vm.$http.post(api, { data }).then((res) => {
        if (res.data.success) {
          vm.emitter.emit('push-message', {
            style: 'success',
            title: '訊息通知',
            content: res.data.message,
            icon: 'fas fa-check-circle'
          })
          vm.emitter.emit('getCart')
        } else {
          vm.emitter.emit('push-message', {
            style: 'danger',
            title: '錯誤通知',
            content: res.data.message.join('、'),
            icon: 'fas fa-exclamation-circle'
          })
        }
        vm.emitter.emit('loading', false)
      }).catch((err) => {
        vm.emitter.emit('push-message', {
          style: 'danger',
          title: '錯誤通知',
          content: err,
          icon: 'fas fa-exclamation-circle'
        })
        vm.emitter.emit('loading', false)
      })
    }
  },
  created () {
    this.productId = this.$route.params.id
    this.emitter.emit('cartVisible', true)
    this.getProductDetail()
  }
}
</script>
