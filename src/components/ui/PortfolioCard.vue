<template>
  <article class="portfolio-card card card--hoverable" data-js-gallery-container>
    <a
      class="portfolio-card__image-wrapper"
      :class="{ 'portfolio-card__image-wrapper--border': item.hasImageWrapperBorder }"
      href="#"
      title="Открыть изображение"
      @click.prevent="$emit('openImage', {
        src: `/images/projects/${item.imgName}_full.jpg`,
        caption: maybeTranslate(item.titleKey ?? item.title),
      })"
    >
      <img
        class="portfolio-card__image"
        :src="`/images/projects/${item.imgName}.jpg`"
        alt=""
        width="400"
        height="320"
        loading="lazy"
      />
    </a>

    <div class="portfolio-card__body">
      <time class="portfolio-card__date" :datetime="item.time.datetime">
        {{ maybeTranslate(item.time.label) }}
      </time>

      <h3 class="portfolio-card__title">
        <a
          v-if="item.href"
          class="portfolio-card__link"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          title="Open the website in a new tab"
        >
          {{ maybeTranslate(item.titleKey ?? item.title) }}
        </a>
        <template v-else>
          {{ maybeTranslate(item.titleKey ?? item.title) }}
        </template>
      </h3>

      <div
        v-if="item.descriptionKey || item.description"
        class="portfolio-card__description"
        v-html="maybeTranslate(item.descriptionKey ?? item.description)"
      />
      <StackBadges v-if="item.stack.length > 0" :items="item.stack" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PortfolioItem } from '@/types/content'
import StackBadges from './StackBadges.vue'
import { useI18n } from '@/composables/useI18n'

defineProps<{ item: PortfolioItem }>()
defineEmits<{
  openImage: [{ src: string; caption: string }]
}>()

const { t } = useI18n()

function maybeTranslate(value?: string) {
  if (!value) return ''
  return value.includes('.') ? t(value) : value
}
</script>

<style scoped>
.portfolio-card {
  display: grid;
  gap: 20px max(40px, 10%);
  grid-template-columns: 35% auto;
}

@media (max-width: 1024px) {
  .portfolio-card {
    column-gap: 40px;
  }
}

@media (max-width: 767px) {
  .portfolio-card {
    grid-template-columns: 1fr;
  }
}

.portfolio-card__image-wrapper {
  border-radius: inherit;
  box-shadow: var(--box-shadow-3);
  height: 320px;
  max-width: max-content;
  overflow: hidden;
  width: 100%;
}

@media (max-width: 767px) {
  .portfolio-card__image-wrapper {
    height: 200px;
  }
}

.is-light-theme-enabled .portfolio-card__image-wrapper {
  box-shadow: var(--box-shadow-6);
}

.portfolio-card__image-wrapper--border {
  border: 2px solid var(--c-accent);
}

.is-light-theme-enabled .portfolio-card__image-wrapper--border {
  border: none;
}

@media (hover: hover) {
  .portfolio-card__image-wrapper:hover {
    box-shadow: none;
  }

  .portfolio-card__image-wrapper:hover .portfolio-card__image {
    transform: scale(1.05) translateZ(0);
  }
}

.dom-is-ready .portfolio-card__image {
  transition: var(--base-transition-duration);
}

.portfolio-card__image {
  border-radius: inherit;
  object-fit: cover;
  object-position: 50% 0;
  pointer-events: none;
  will-change: transform;
}

.portfolio-card__date {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-inset-2);
  color: var(--c-accent);
  display: inline-block;
  font-weight: 400;
  padding: 8px 16px;
}

@media (max-width: 640px) {
  .portfolio-card__date {
    font-size: 0.9em;
  }
}

.portfolio-card__date:not(:last-child) {
  margin-bottom: 16px;
}

.portfolio-card__title.portfolio-card__title {
  --marginBottom: 20px;
}

.portfolio-card__description:not(:last-child) {
  margin-bottom: 20px;
}
</style>
