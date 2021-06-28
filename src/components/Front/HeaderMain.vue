<template>
  <div class="container">
  <h1 class="h2 header-deco mb-4 animated-x">
    <slot name="headerMain"></slot>
  </h1>
  <div class="animated-x">
  <slot name="content"></slot>
  </div>
  </div>
</template>

<script>
import HeaderMixin from '@/mixin/HeaderMixin.js'
export default {
  name: 'Header',
  mixins: [HeaderMixin]
}
</script>
