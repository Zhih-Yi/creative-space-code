import $ from 'jquery'
export default {
  methods: {
    scroll () {
      const scrollPos = $(window).scrollTop()
      const windowH = $(window).height()
      $('.animated-x').each(function () {
        const thisPos = $(this).offset().top
        if ((windowH + scrollPos) >= thisPos) {
          $(this).addClass('slidein')
        }
      })
    }
  },
  created () {
    window.addEventListener('scroll', this.scroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.scroll)
  }
}
