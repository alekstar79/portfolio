<template>
  <article class="work-experience-card card card--hoverable">
    <time class="work-experience-card__date" :datetime="item.time.datetime">{{ item.time.label }}</time>
    <h3 class="work-experience-card__title">
      <a v-if="item.href" class="work-experience-card__link" :href="item.href" target="_blank" rel="noreferrer" title="Open a new tab">
        {{ item.title }}
      </a>
      <template v-else>{{ item.title }}</template>
    </h3>
    <div class="work-experience-card__position">{{ item.position }}</div>
    <div v-if="item.description" class="work-experience-card__description" v-html="item.description"></div>
    <StackBadges v-if="item.stack.length > 0" :items="item.stack" />
  </article>
</template>

<script setup lang="ts">
import type { WorkExperienceItem } from '@/types/content'
import StackBadges from './StackBadges.vue'

defineProps<{ item: WorkExperienceItem }>()
</script>

<style scoped>
.work-experience-card__date {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-inset-2);
  color: var(--c-accent);
  display: inline-block;
  font-weight: 400;
  padding: 8px 16px;
}

@media (max-width: 640px) {
  .work-experience-card__date {
    font-size: 0.9em;
  }
}

.work-experience-card__date:not(:last-child) {
  margin-bottom: 16px;
}

.work-experience-card__title {
  --marginBottom: 0;
  line-height: 1.5;
}

.work-experience-card__position {
  color: var(--c-accent);
}

.work-experience-card__description:not(:last-child),
.work-experience-card__position:not(:last-child) {
  margin-bottom: 20px;
}
</style>
