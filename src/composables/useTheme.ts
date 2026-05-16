import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'isLightThemeEnabled'

export function useTheme() {
  const isLightThemeEnabled = ref(false)

  const readInitialTheme = (): boolean => {
    const persisted = localStorage.getItem(STORAGE_KEY)
    if (persisted === 'true') {
      return true
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches

  }

  const setThemeClass = (enabled: boolean): void => {
    document.documentElement.classList.toggle('is-light-theme-enabled', enabled)
  }

  const initTheme = (): void => {
    isLightThemeEnabled.value = readInitialTheme()
    setThemeClass(isLightThemeEnabled.value)
  }

  watch(isLightThemeEnabled, (value) => {
    setThemeClass(value)
    if (value) {
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  })

  const themeLabel = computed(() => (isLightThemeEnabled.value ? 'Disable light theme' : 'Enable light theme'))

  return { isLightThemeEnabled, initTheme, themeLabel }
}
