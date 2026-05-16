<template>
  <div :class="rootClasses">
    <ul class="soc1als__list flow">
      <li v-for="item in items" :key="item.href" class="soc1als__item">
        <a class="soc1als__link" :href="item.href" target="_blank" :title="item.label" :aria-label="item.label">
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

  return ['soc1als', ...extraClasses]
})
</script>

<style scoped>
@media (min-width: 768px) {
  .soc1als__list {
    justify-content: flex-end;
  }
}

.soc1als__list.flow {
  --gapX: 16px;
  --gapY: 8px;
}

@media (max-width: 1024px) {
  .soc1als__list.flow {
    --gapX: 10px;
  }
}

@media (max-width: 767px) {
  .soc1als__list.flow {
    --gapX: 8px;
  }
}

.soc1als__link {
  --size: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: var(--box-shadow-inset-2);
}

.dom-is-ready .soc1als__link {
  transition: 0.05s;
}

@media (max-width: 1024px) {
  .soc1als__link {
    --size: 50px;
  }
}

@media (max-width: 375px) {
  .soc1als__link {
    --size: 58px;
  }
}

.soc1als__link :deep(.i-icon) {
  --size: 62.5%;
  --color: var(--c-light);
}

.is-light-theme-enabled .soc1als__link :deep(.i-icon) {
  --color: var(--c-dark);
}

@media (hover: hover) {
  .soc1als__link:hover :deep(.i-icon) {
    --color: var(--c-accent);
  }
}
</style>
