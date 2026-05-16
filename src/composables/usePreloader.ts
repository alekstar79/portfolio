import { onMounted, onUnmounted, ref } from 'vue'
import { lock, unlock } from 'tua-body-scroll-lock'

export const PRELOADER_FADE_AWAY_EVENT = 'preloader::fadeAway'

export function usePreloader() {
  const isShown = ref(true)
  const isAnimationStarted = ref(false)
  const lastPartRef = ref<HTMLElement | null>(null)

  let animationTimer: number | null = null
  let animationCounter = 0
  let isPageLoaded = false
  let isFadeAway = false

  const manageAnimationEnd = (): void => {
    if (animationCounter >= 1 && isPageLoaded) {
      close()
    }
  }

  const close = (): void => {
    if (isFadeAway) {
      return
    }

    unlock()
    isShown.value = false
    isFadeAway = true
    document.dispatchEvent(new CustomEvent(PRELOADER_FADE_AWAY_EVENT))
  }

  const onWindowLoad = (): void => {
    isPageLoaded = true
    manageAnimationEnd()
  }

  const onLastPartTransitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName !== 'transform') {
      return
    }

    animationCounter += 1
    manageAnimationEnd()
  }

  onMounted(() => {
    lock()

    animationTimer = window.setTimeout(() => {
      isAnimationStarted.value = true
    }, 100)

    window.addEventListener('load', onWindowLoad)
    lastPartRef.value?.addEventListener('transitionend', onLastPartTransitionEnd)

    if (document.readyState === 'complete') {
      onWindowLoad()
    }
  })

  onUnmounted(() => {
    unlock()

    if (animationTimer !== null) {
      window.clearTimeout(animationTimer)
    }

    window.removeEventListener('load', onWindowLoad)
    lastPartRef.value?.removeEventListener('transitionend', onLastPartTransitionEnd)
  })

  return { isShown, isAnimationStarted, lastPartRef }
}
