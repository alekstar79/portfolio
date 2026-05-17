<template>
  <header ref="headerRef" class="header" :class="{ 'is-scrolled': isScrolled }">
    <div class="header__inner container">
      <a class="logo header__logo" href="/" :aria-label="t('common.home')" :title="t('common.home')">
        <svg class="logo__svg" width="64" height="64" viewBox="0 0 64 64" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M45.6001 34.7586C45.6001 33.6157 44.5258 32.6896 43.2001 32.6896H20.8C19.4743 32.6896 18.4 33.6157 18.4 34.7586V51.3103C18.4 51.6909 18.7586 52 19.2 52H44.8001C45.2415 52 45.6001 51.6909 45.6001 51.3103V34.7586ZM32.8412 37.9889L29.6412 46.2647C29.5019 46.6256 29.7283 47.0166 30.1476 47.1372C30.5662 47.2573 31.0198 47.0621 31.1597 46.7007L34.3597 38.4248C34.499 38.064 34.2726 37.6729 33.8533 37.5523C33.4347 37.4322 32.9812 37.6274 32.8412 37.9889ZM27.8658 46.1L24.9619 42.3447L27.8658 38.5895C28.1105 38.2723 28.0115 37.8441 27.6444 37.6328C27.2765 37.4219 26.7797 37.5072 26.5347 37.8237L23.3347 41.9617C23.1554 42.1935 23.1554 42.4955 23.3347 42.7271L26.5347 46.865C26.7794 47.1815 27.2761 47.2671 27.6444 47.0559C28.0115 46.845 28.1108 46.4167 27.8658 46.0993V46.1ZM37.4658 46.8654L40.6658 42.7275C40.8451 42.4956 40.8451 42.1936 40.6658 41.9621L37.4658 37.8241C37.2212 37.5076 36.7244 37.422 36.3562 37.6333C35.989 37.8442 35.8897 38.2724 36.1347 38.5899L39.0387 42.3451L36.1347 46.1004C35.8901 46.4175 35.989 46.8458 36.3562 47.057C36.724 47.2679 37.2208 47.1826 37.4658 46.8661V46.8654Z"
            fill="white" />
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M43.2 21.6552C43.2 26.9877 38.1857 31.3103 32 31.3103C25.8143 31.3103 20.8 26.9877 20.8 21.6552C20.8 16.3227 25.8143 12 32 12C38.1857 12 43.2 16.3227 43.2 21.6552Z"
            fill="white" />
        </svg>
      </a>
      <nav class="header__menu hidden-mobile">
        <ul class="header__menu-list">
          <li v-for="item in menuItems" :key="item" class="header__menu-item">
            <a class="header__menu-link" :href="toAnchorKey(item)">{{ t(item) }}</a>
          </li>
        </ul>
      </nav>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <BurgerButton :is-open="isOpen" @toggle="toggle" />
    </div>
    <MobileMenu :is-open="isOpen" :items="menuItems" @close="close" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { menuItems } from '@/utils/content'
import { useI18n } from '@/composables/useI18n'
import { useHeaderState } from '@/composables/useHeaderState'
import { useMobileMenu } from '@/composables/useMobileMenu'
import BurgerButton from './BurgerButton.vue'
import MobileMenu from './MobileMenu.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const headerRef = ref<HTMLElement | null>(null)
const { isScrolled, mount } = useHeaderState()
const { isOpen, toggle, close } = useMobileMenu()

const toAnchor = (item: string): string => `#${item.replaceAll(' ', '-').toLowerCase()}`

const { t } = useI18n()

const toAnchorKey = (item: string): string => {
  const key = item.split('.').pop() || item
  return `#${key.replaceAll(' ', '-').toLowerCase()}`
}

onMounted(() => {
  if (headerRef.value) {
    mount(headerRef.value)
  }
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--layoutHeader);
  width: 100%;
  padding-block: 24px;
}

@media (max-width: 767px) {
  .header {
    padding-block: 12px;
  }
}

.dom-is-ready .header {
  transition:
    padding-block var(--base-transition-duration),
    background-color var(--base-transition-duration),
    box-shadow var(--base-transition-duration);
}

.header.is-scrolled {
  padding-block: 12px;
  background-color: var(--c-dark);
  box-shadow: var(--box-shadow-3);
}

.is-light-theme-enabled .header.is-scrolled {
  background-color: var(--c-light);
  box-shadow: var(--box-shadow-4);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

@media (max-width: 1024px) {
  .header__menu.hidden-mobile {
    display: none !important;
  }

  .header__burger-button {
    display: flex !important;
  }
}

@media (max-width: 767px) {
  .header__logo {
    margin-right: auto;
  }
}

.header__menu {
  min-width: 0;
  flex: 1 1 auto;
}

.header__menu-list {
  display: flex;
  gap: 28px;
  white-space: nowrap;
}

.header__menu-link {
  display: inline-flex;
  padding-block: 20px;
  white-space: nowrap;
}

.header__burger-button {
  position: relative;
  z-index: var(--layerOverlayControls);
}

.logo {
  --size: 64px;
}

@media (max-width: 767px) {
  .logo {
    --size: 48px;
  }
}

.logo__svg {
  width: var(--size);
  height: var(--size);
}

.logo__svg :deep(*) {
  fill: var(--c-light);
}

.is-light-theme-enabled .logo__svg :deep(*) {
  fill: var(--c-dark);
}

@media (hover: hover) {
  .logo__svg:hover :deep(*) {
    fill: var(--c-accent);
  }
}
</style>
