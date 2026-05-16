import { onMounted, onUnmounted, ref } from 'vue'

export function useHeaderState() {
  const isScrolled = ref(false)

  const setHeaderHeightVar = (headerEl: HTMLElement): void => {
    document.documentElement.style.setProperty('--headerHeight', `${headerEl.offsetHeight}px`)
  }

  const bind = (headerEl: HTMLElement): (() => void) => {
    const onScroll = (): void => {
      isScrolled.value = window.scrollY > 30
    }
    const onResize = (): void => {
      setHeaderHeightVar(headerEl)
    }
    onScroll()
    onResize()
    document.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onResize)
    return () => {
      document.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
    }
  }

  let cleanup: (() => void) | null = null

  const mount = (headerEl: HTMLElement): void => {
    cleanup = bind(headerEl)
  }

  onMounted(() => undefined)
  onUnmounted(() => cleanup?.())

  return { isScrolled, mount }
}
