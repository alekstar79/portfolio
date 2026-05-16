<template>
  <div class="skill-card">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<style scoped>
.skill-card {
  --padding: 20px;
}

.dom-is-ready .skill-card {
  transition: var(--base-transition-duration);
}

.skill-card {
  --shadowBefore: var(--box-shadow-3), var(--box-shadow-inset-transparent);
  --shadowAfter: var(--box-shadow-3-transparent), var(--box-shadow-inset);
  box-shadow: var(--shadowBefore);
}

.is-light-theme-enabled .skill-card {
  --shadowBefore: var(--box-shadow-4), var(--box-shadow-inset-2-transparent);
  --shadowAfter: var(--box-shadow-4-transparent), var(--box-shadow-inset-2);
}

@media (hover: hover) {
  .skill-card:hover {
    box-shadow: var(--shadowAfter);
  }
}

.skill-card {
  border-radius: var(--border-radius);
  font-size: 20px;
  padding: var(--padding);
  padding-left: 60px;
  position: relative;
}

@media (max-width: 767px) {
  .skill-card {
    --padding: 15px;
    font-size: 16px;
    padding-left: 48px;
  }
}

@media (max-width: 640px) {
  .skill-card {
    padding-left: 40px;
  }
}

.skill-card:before {
  --size: 12px;
  background-color: var(--c-accent);
  border-radius: 50%;
  content: "";
  height: var(--size);
  left: var(--padding);
  position: absolute;
  top: calc(var(--padding) + 0.35em);
  width: var(--size);
}

@media (max-width: 640px) {
  .skill-card:before {
    --size: 10px;
  }
}
</style>
