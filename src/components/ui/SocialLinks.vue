<template>
  <div :class="rootClasses">
    <ul class="social-links__list">
      <li v-for="item in items" :key="item.href" class="social-links__item">
        <a class="social-links__link" :href="item.href" target="_blank" :title="t(item.label)"
          :aria-label="t(item.label)">
          <AppIcon :name="item.icon" variant="mono" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { SocialItem } from '@/types/content'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  extraClasses?: string | string[]
  items: SocialItem[]
}>()

const rootClasses = computed(() => {
  const extraClasses = Array.isArray(props.extraClasses)
    ? props.extraClasses
    : props.extraClasses
      ? [props.extraClasses]
      : []

  return ['social-links', ...extraClasses]
})
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.social-links__list {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  justify-content: flex-end;
}

@media (max-width: 1024px) {
  .social-links__list {
    gap: 10px;
  }
}

@media (max-width: 767px) {
  .social-links__list {
    gap: 8px;
  }
}

.social-links__item {
  flex: 0 0 auto;
}

.social-links__link {
  --size: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: var(--box-shadow-inset-2);
}

.social-links__link::after {
  content: none;
}

.dom-is-ready .social-links__link {
  transition: 0.05s;
}

@media (max-width: 1024px) {
  .social-links__link {
    --size: 50px;
  }
}

@media (max-width: 375px) {
  .social-links__link {
    --size: 58px;
  }
}

.social-links__link :deep(.i-icon) {
  --size: 62.5%;
  --color: var(--c-light);
}

.is-light-theme-enabled .social-links__link :deep(.i-icon) {
  --color: var(--c-dark);
}

@media (hover: hover) {
  .social-links__link:hover :deep(.i-icon) {
    --color: var(--c-accent);
  }
}
</style>
