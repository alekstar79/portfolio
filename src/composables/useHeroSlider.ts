import { onMounted, onUnmounted, ref } from 'vue'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css/bundle'

Swiper.use([Navigation, Autoplay])

export function useHeroSlider() {
  const sliderRoot = ref<HTMLElement | null>(null)
  let slider: Swiper | null = null

  onMounted(() => {
    const root = sliderRoot.value
    if (!root) {
      return
    }
    const container = root.querySelector<HTMLElement>('.swiper')
    if (!container) {
      return
    }
    slider = new Swiper(container, {
      speed: 250,
      loop: true,
      preventInteractionOnTransition: false,
      autoplay: { delay: 2000 },
      navigation: {
        prevEl: '.hero-slider__button--prev',
        nextEl: '.hero-slider__button--next',
      },
      breakpoints: {
        1024: { slidesPerView: 4, spaceBetween: 8, allowTouchMove: false },
        641: { slidesPerView: 4, spaceBetween: 8, allowTouchMove: false },
        0: { slidesPerView: 3, spaceBetween: 4 },
      },
    })
  })

  onUnmounted(() => {
    slider?.destroy(true, true)
    slider = null
  })

  return { sliderRoot }
}
