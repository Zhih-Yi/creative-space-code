<template>
  <div>
    <MessageList/>
    <LoadingItem/>
    <ProductManage/>
    <router-view></router-view>
  </div>
</template>

<script>
import ProductManage from '@/components/Back/NavbarManage.vue'
import MessageList from '@/components/Share/MessageList.vue'
import LoadingItem from '@/components/Share/LoadingItem.vue'

export default {
  name: 'Dashboard',
  components: {
    ProductManage,
    MessageList,
    LoadingItem
  },
  provide () {
    return {
      Loading: false
    }
  },
  created () {
    const vm = this
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    vm.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}/api/user/check`
    vm.$http.post(api).then((res) => {
      if (!res.data.success) {
        vm.$router.push('/login')
      }
    }).catch((err) => {
      vm.emitter.emit('push-message', {
        style: 'danger',
        title: '錯誤通知',
        content: err,
        icon: 'fas fa-exclamation-circle'
      })
    })
  }
}
</script>
