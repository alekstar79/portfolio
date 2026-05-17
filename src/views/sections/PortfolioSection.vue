<template>
  <section id="portfolio" class="section scroll-effect" data-js-scroll-effect>
    <div class="section__inner container">
      <header class="section__header">
        <h2 class="section__title">{{ t('sections.portfolio.title').split(' ')[0] }} <span class="accent-color">{{
          t('sections.portfolio.title').split(' ').slice(1).join(' ') }}</span></h2>
      </header>
      <ul class="portfolio__list grid">
        <li v-for="(item, index) in portfolioItems" :key="`${item.titleKey ?? item.title ?? index}-${index}`"
          class="portfolio__item grid__item" :style="{ '--reveal-delay': `${(index + 1) * 0.2}s` }">
          <PortfolioCard :item="item" @open-gallery="openPortfolioItem(portfolioItems, index)" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import PortfolioCard from '@/components/ui/PortfolioCard.vue'
import { useGallery } from '@/composables/useGallery'
import { portfolioItems } from '@/utils/content'
import { useI18n } from '@/composables/useI18n'

const { openPortfolioItem } = useGallery()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.scroll-effect .portfolio__item {
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 100px, 0);
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.dom-is-ready .scroll-effect .portfolio__item {
  transition-duration: 1.6s, 0.8s;
}

.scroll-effect--visible .portfolio__item {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: var(--reveal-delay, 0s);
}
</style>
