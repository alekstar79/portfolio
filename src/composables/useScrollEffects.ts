import { onMounted, onUnmounted } from 'vue'

export function useScrollEffects() {
  let observer: IntersectionObserver | null = null
  let initTimer: number | null = null

  const init = (): void => {
    const blocks = document.querySelectorAll<HTMLElement>('[data-js-scroll-effect]')

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-effect--visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    blocks.forEach((block) => {
      if (!block.classList.contains('scroll-effect')) {
        block.classList.add('scroll-effect')
      }

      observer?.observe(block)
    })
  }

  onMounted(() => {
    initTimer = window.setTimeout(() => {
      init()
    }, 1200)
  })

  onUnmounted(() => {
    if (initTimer !== null) {
      window.clearTimeout(initTimer)
    }

    observer?.disconnect()
    observer = null
  })
}
