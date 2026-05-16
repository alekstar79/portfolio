<template>
  <svg class="i-icon">
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
  }>(),
  {
    variant: 'original',
  }
)

const href = computed(() => {
  const suffix = props.variant === 'mono' ? '-mono' : ''
  return `#icon-${props.name}${suffix}`
})
</script>
