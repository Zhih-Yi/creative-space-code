<template>
  <div class="home">
    <Navbar/>
    <MessageList/>
    <LoadingItem/>
    <ShoppingCart/>
    <router-view></router-view>
    <ScrollTop/>
    <footer class="footer py-3 my-3 container">
      <div class="row">
        <div class="col-md-8">
          <ul class="d-flex list-unstyled">
            <li>
              <a href="https://social-plugins.line.me/lineit/share?url=https://zhih-yi.github.io/creative-space-demo/"
              target="_blank" class="me-3"><i class="fab fa-line fa-lg"></i>
              </a>
            </li>
            <li data-href="https://zhih-yi.github.io/creative-space-demo/">
              <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzhih-yi.github.io%2Fcreative-space-demo%2F&amp;src=sdkpreparse" class="me-3">
              <i class="fab fa-facebook fa-lg"></i>
              </a>
            </li>
          </ul>
          <p class="my-3">圖片僅供個人學習使用，無商業用途</p>
        </div>
        <div class="col-md-4 justify-md-content-end d-flex">
          <ul class="list-unstyled">
            <li>
              <p class="mb-0"><i class="fas fa-paper-plane me-2"></i>
                <a class="footer-link" href="mailto:example@gmail.com">example@gmail.com</a>
              </p>
            </li>
            <li>
              <p class="mb-0"><i class="fas fa-phone me-2"></i>
                <a class="footer-link" href="tel:+23048472">02-2304-8472</a>
              </p>
            </li>
            <li>
              <p class="mb-0">
                <i class="fas fa-paper-plane me-2"></i>新北市新店區裝修街11號1樓
              </p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <!--分享功能-->
    <div id="fb-root"></div>
  </div>
</template>
<script>
import Navbar from '@/components/Front/Navbar.vue'
import MessageList from '@/components/Share/MessageList.vue'
import LoadingItem from '@/components/Share/LoadingItem.vue'
import ShoppingCart from '@/components/Front/ShoppingCart.vue'
import ScrollTop from '@/components/Share/ScrollTop.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    MessageList,
    LoadingItem,
    ShoppingCart,
    ScrollTop
  },
  provide () {
    return {
      Loading: false
    }
  }
}
</script>
