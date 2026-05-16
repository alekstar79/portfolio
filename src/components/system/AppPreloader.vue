<template>
  <div
    class="preloader"
    data-js-preloader
    :class="{
      'is-shown': isShown,
      'is-animation-started': isAnimationStarted,
    }"
  >
    <div class="preloader__part"></div>
    <div class="preloader__part"></div>
    <div ref="lastPartRef" class="preloader__part" data-js-preloader-last-part></div>
  </div>
</template>

<script setup lang="ts">
import { usePreloader } from '@/composables/usePreloader'

const { isAnimationStarted, isShown, lastPartRef } = usePreloader()
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--layerPreloader);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  background-color: var(--c-dark);
}

.preloader:not(.is-shown) {
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
  transition: 1s;
}

.preloader__part {
  height: 100%;
  background-color: var(--c-accent);
  transform: translateY(100%);
  transition-delay: var(--delay);
  transition-duration: 0.9s;
  will-change: transform;
}

.is-animation-started .preloader__part {
  transform: translateY(-100%);
}

.preloader__part:nth-child(1) {
  --delay: 0.15s;
}

.preloader__part:nth-child(2) {
  --delay: 0.3s;
}

.preloader__part:nth-child(3) {
  --delay: 0.45s;
}
</style>
