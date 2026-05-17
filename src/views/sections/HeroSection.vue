<template>
  <div class="hero section" id="about">
    <div class="hero__inner container">
      <div class="hero__body">
        <LiveTyping />
        <button class="button hero__button" type="button" data-js-button :aria-label="t('hero.button.label')"
          @click="scrollToAnchor('#contacts')">
          <span class="button__label">{{ t('hero.button.text') }}</span>
        </button>
      </div>
      <div class="hero__scene-wrapper">
        <HeroScene />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroScene from '@/components/hero/HeroScene.vue'
import LiveTyping from '@/components/ui/LiveTyping.vue'
import { useScrollTo } from '@/composables/useScrollTo'
import { useI18n } from '@/composables/useI18n'

const { scrollToAnchor } = useScrollTo()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.hero {
  &__inner {
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__body {
    width: 100%;
    min-width: 0;
    flex: 1 1 0;
    margin-right: max(40px, 10%);

    @media (max-width: 1280px) {
      margin-right: 40px;
    }

    @media (max-width: 768px) {
      margin-bottom: var(--section-padding-y);
      margin-right: 0;
    }
  }

  &__title {
    min-height: 5.2em;

    @media (max-width: 767px) {
      min-height: 5.6em;

      br {
        display: none;
      }
    }

    @media (max-width: 1280px) {
      // Additional responsive adjustments if needed
    }
  }

  &__scene-wrapper {
    flex: 0 0 var(--hero-scene-size, 600px);
    width: var(--hero-scene-size, 600px);
    min-width: 0;

    .hero-scene {
      width: 100%;
    }

    @media (max-width: 1280px) {
      --hero-scene-size: 500px;
    }

    @media (max-width: 640px) {
      --hero-scene-size: calc(100vw - var(--gridPadding) * 2);
    }

    @media (max-width: 768px) {
      width: 100%;
      flex: 0 0 auto;
    }
  }

  &__button {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    opacity: 0;
    visibility: hidden;

    @media (max-width: 480px) {
      width: 100%;
    }

    // Show button after typing is finished
    .hero__title.is-typing-finished~& {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
