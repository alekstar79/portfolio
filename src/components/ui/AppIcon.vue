<template>
  <svg class="i-icon" :style="color ? { '--icon-color': color } : {}">
    <use :href="href"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type IconVariant = 'mono' | 'original'

const props = withDefaults(
  defineProps<{
    name: string
    variant?: IconVariant
    color?: string
  }>(),
  {
    variant: 'original',
    color: undefined,
  }
)

const href = computed(() => {
  const suffix = props.variant === 'mono' ? '-mono' : ''
  return `#icon-${props.name}${suffix}`
})
</script>

<style scoped>
.i-icon {
  --icon-color: currentColor;
  --size: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
}
</style>
