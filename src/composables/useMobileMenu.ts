import { computed, ref } from 'vue'
import { lock, unlock } from 'tua-body-scroll-lock'

export function useMobileMenu() {
  const isOpen = ref(false)

  const open = (): void => {
    lock()
    isOpen.value = true
    document.documentElement.classList.add('is-mobile-menu-open')
  }

  const close = (): void => {
    unlock()
    isOpen.value = false
    document.documentElement.classList.remove('is-mobile-menu-open')
  }

  const toggle = (): void => {
    if (isOpen.value) {
      close()
      return
    }
    open()
  }

  const stateClass = computed(() => (isOpen.value ? 'is-open' : ''))

  return { isOpen, open, close, toggle, stateClass }
}
