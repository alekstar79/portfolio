<template>
  <section id="work-experience" class="section scroll-effect" data-js-scroll-effect>
    <div class="section__inner container">
      <header class="section__header">
        <h2 class="section__title">Work <span class="accent-color">Experience</span></h2>
      </header>
      <div class="section__body">
        <div class="work-experience">
          <ul class="work-experience__list grid">
            <li
              v-for="(item, index) in workExperienceItems"
              :key="`${item.title}-${index}`"
              class="work-experience__item grid__item"
              :style="{ '--reveal-delay': `${(index + 1) * 0.2}s` }"
            >
              <WorkExperienceCard :item="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import WorkExperienceCard from '@/components/ui/WorkExperienceCard.vue'
import { workExperienceItems } from '@/utils/content'
</script>

<style lang="scss" scoped>
.work-experience {
  --circleSize: 40px;
  padding-left: calc(var(--circleSize) * 2);
}

@media (max-width: 767px) {
  .work-experience {
    --circleSize: 24px;
  }
}

.work-experience__list {
  position: relative;
}

.work-experience__list::before {
  content: "";
  position: absolute;
  top: 50%;
  right: calc(100% + var(--circleSize) * 1.5);
  width: 1px;
  height: 100%;
  background-color: var(--c-accent);
  transform: translateY(-50%);
}

.scroll-effect .work-experience__item {
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 100px, 0);
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.dom-is-ready .scroll-effect .work-experience__item {
  transition-duration: 1.6s, 0.8s;
}

.scroll-effect--visible .work-experience__item {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: var(--reveal-delay, 0s);
}

.work-experience__item {
  position: relative;
}

.work-experience__item::before {
  --size: calc(var(--circleSize) * 0.3);
  --borderWidth: calc((var(--circleSize) - var(--size)) / 2);
  content: "";
  position: absolute;
  top: 50%;
  right: calc(100% + var(--circleSize));
  z-index: 1;
  width: var(--size);
  height: var(--size);
  background-color: var(--c-accent);
  border: var(--borderWidth) solid var(--c-dark);
  border-radius: 50%;
  box-shadow: var(--box-shadow-3);
  box-sizing: content-box;
  transform: translateY(-50%);
}

.is-light-theme-enabled .work-experience__item::before {
  border-color: var(--c-light);
  box-shadow: var(--box-shadow-4);
}

.work-experience__item:first-child::after,
.work-experience__item:last-child::after {
  content: "";
  position: absolute;
  right: calc(100% + var(--circleSize) * 1.5);
  width: 1px;
  height: 50%;
  background-color: var(--c-dark);
}

.is-light-theme-enabled .work-experience__item:first-child::after,
.is-light-theme-enabled .work-experience__item:last-child::after {
  background-color: var(--c-light);
}

.work-experience__item:first-child::after {
  top: 0;
}

.work-experience__item:last-child::after {
  bottom: 0;
}
</style>
