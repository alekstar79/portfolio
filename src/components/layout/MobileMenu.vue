<template>
  <div class="mobile-menu visible-mobile" :class="{ 'is-open': isOpen }">
    <div class="mobile-menu__inner container">
      <ul class="mobile-menu__navigation-list">
        <li v-for="item in items" :key="item" class="mobile-menu__navigation-item">
          <a class="mobile-menu__navigation-link" :href="toAnchorKey(item)" @click="$emit('close')">
            {{ t(item) }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

defineProps<{ isOpen: boolean; items: readonly string[] }>()
defineEmits<{ close: [] }>()

const { t } = useI18n()

const toAnchorKey = (item: string): string => {
  const key = item.split('.').pop() || item
  return `#${key.replaceAll(' ', '-').toLowerCase()}`
}
</script>

<style scoped>
.mobile-menu {
  --textColor: var(--c-light);
  --bgColor: var(--c-dark);
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--layerOverlay);
  width: 100%;
  height: 100%;
  padding-block: 80px;
  background-color: var(--bgColor);
}

.dom-is-ready .mobile-menu {
  transition: var(--base-transition-duration);
}

.is-light-theme-enabled .mobile-menu {
  --textColor: var(--c-accent);
  --bgColor: var(--c-light);
}

.mobile-menu:not(.is-open) {
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
}

.mobile-menu__inner {
  display: grid;
  place-items: center;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.mobile-menu__navigation-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.mobile-menu__navigation-link {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-block: 12px;
  font-size: 32px;
  color: var(--textColor);
}
</style>
