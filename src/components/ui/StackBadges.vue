<template>
  <ul class="stack__list flow">
    <li v-for="item in items" :key="item" class="stack__item">
      <img class="stack__image" :src="getIconPath(item)" :alt="item" :title="item" width="36" height="36" loading="lazy" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{ items: string[] }>()

const getIconPath = (item: string): string => `/images/icons/${item.replaceAll(' ', '-').toLowerCase().trim()}.svg`

void props
</script>

<style scoped>
.stack__list.flow {
  --gapX: 16px;
  --gapY: 8px;
}

@media (max-width: 767px) {
  .stack__list.flow {
    --gapX: 8px;
  }
}

@media (max-width: 640px) {
  .stack__list.flow {
    --gapX: 4px;
  }
}

.stack__item {
  --size: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  border: 1px solid transparent;
  border-radius: 50%;
  box-shadow: var(--box-shadow-inset-2);
}

.dom-is-ready .stack__item {
  transition: var(--base-transition-duration);
}

@media (max-width: 767px) {
  .stack__item {
    --size: 54px;
  }
}

@media (max-width: 640px) {
  .stack__item {
    --size: 45px;
  }
}

@media (hover: hover) {
  .stack__item:hover {
    border-color: var(--c-accent);
  }
}

.stack__image {
  --size: 50%;
  width: var(--size);
  height: var(--size);
  object-fit: contain;
}

@media (max-width: 640px) {
  .stack__image {
    --size: 65%;
  }
}
</style>
