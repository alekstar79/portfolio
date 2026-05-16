<template>
  <button
    class="burger-button header__burger-button visible-mobile"
    :class="{ 'is-open': isOpen }"
    type="button"
    title="Open menu"
    aria-label="Open menu"
    @click="$emit('toggle')"
  >
    <svg class="burger-button__svg" width="30" height="30" viewBox="0 0 100 100">
      <path class="burger-button__line burger-button__line--1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
      <path class="burger-button__line burger-button__line--2" d="M 20,50 H 80" />
      <path class="burger-button__line burger-button__line--3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<style scoped>
.burger-button {
  --size: 36px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  padding: 0;
  background-color: transparent;
  border: 1px solid var(--c-accent);
  border-radius: var(--border-radius-4);
  box-shadow: none;
  appearance: none;
}

.burger-button.is-open .burger-button__line--1,
.burger-button.is-open .burger-button__line--3 {
  stroke-dasharray: 90 207;
}

.burger-button.is-open .burger-button__line--1 {
  stroke-dashoffset: -134;
}

.burger-button.is-open .burger-button__line--2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
}

.burger-button.is-open .burger-button__line--3 {
  stroke-dashoffset: -134;
}

.burger-button__svg {
  width: 70%;
  height: 70%;
}

.burger-button__line {
  fill: none;
  stroke: var(--c-accent);
  stroke-width: 6;
  stroke-linecap: round;
  transition:
    stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.burger-button__line--1 {
  stroke-dasharray: 60 207;
}

.burger-button__line--2 {
  stroke-dasharray: 60 60;
}

.burger-button__line--3 {
  stroke-dasharray: 60 207;
}
</style>
