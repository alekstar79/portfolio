import { ref, computed } from 'vue'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

type LocaleKey = 'en' | 'ru'

const STORAGE_KEY = 'locale'

const messages: Record<LocaleKey, Record<string, any>> = {
  en,
  ru,
}

const locale = ref<LocaleKey>((localStorage.getItem(STORAGE_KEY) as LocaleKey) || (navigator.language?.startsWith('ru') ? 'ru' : 'en'))

function setLocale(l: LocaleKey) {
  locale.value = l
  localStorage.setItem(STORAGE_KEY, l)
}

function t(path: string, fallback?: string): string {
  const parts = path.split('.')
  let cur: any = messages[locale.value]
  for (const p of parts) {
    if (!cur) break
    cur = cur[p]
  }
  if (typeof cur === 'string') return cur
  return fallback || path
}

const currentLocale = computed(() => locale.value)

export function useI18n() {
  return { t, setLocale, currentLocale }
}

export default { t, setLocale, currentLocale }
