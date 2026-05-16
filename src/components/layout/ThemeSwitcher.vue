<template>
  <label class="theme-switcher header__theme-switcher" data-js-theme-switcher :title="themeLabel">
    <span class="visually-hidden">Switch theme</span>
    <input v-model="isLightThemeEnabled" class="theme-switcher__checkbox visually-hidden" type="checkbox" data-js-theme-switcher-checkbox />
    <span class="theme-switcher__body" title="Switch theme">
      <span class="theme-switcher__icon-wrapper theme-switcher__icon-wrapper--dark-theme">
        <AppIcon name="moon" />
      </span>
      <span class="theme-switcher__icon-wrapper theme-switcher__icon-wrapper--light-theme">
        <AppIcon name="sun" />
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { isLightThemeEnabled, initTheme, themeLabel } = useTheme()
onMounted(initTheme)
</script>

<style scoped>
.theme-switcher {
  --padding: 2px;
  --iconWrapperWidth: 42px;
  --iconSize: 20px;
  background-color: var(--c-dark);
  border: 1px solid transparent;
  border-radius: var(--border-radius-3);
  box-shadow: var(--box-shadow-3);
  cursor: pointer;
}

@media (hover: hover) {
  .theme-switcher:hover {
    border-color: var(--c-accent);
  }
}

.is-light-theme-enabled .theme-switcher {
  background-color: var(--c-light);
  box-shadow: var(--box-shadow-4);
}

.theme-switcher__checkbox:focus-visible ~ .theme-switcher__body {
  outline: var(--focus-outline);
  outline-offset: 4px;
}

.theme-switcher__body {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--padding);
  padding: var(--padding);
  border-radius: inherit;
}

.theme-switcher__body::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 2px;
  width: var(--iconWrapperWidth);
  height: var(--iconWrapperWidth);
  background-color: var(--c-white);
  border-radius: inherit;
  transform: translate3d(0, -50%, 0);
  will-change: transform;
}

.is-light-theme-enabled .theme-switcher__body::after {
  transform: translate3d(calc(var(--iconWrapperWidth) + var(--padding)), -50%, 0);
}

.theme-switcher__icon-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--iconWrapperWidth);
  height: var(--iconWrapperWidth);
}

.theme-switcher__icon-wrapper :deep(.i-icon) {
  --size: var(--iconSize);
  --color: var(--c-white);
}

.theme-switcher__icon-wrapper--dark-theme :deep(.i-icon) {
  --color: var(--c-dark);
}

.is-light-theme-enabled .theme-switcher__icon-wrapper--light-theme :deep(.i-icon) {
  --color: var(--c-dark);
}
</style>
