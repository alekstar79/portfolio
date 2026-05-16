<template>
  <section class="section skills" id="skills">
    <div class="skills__inner grid grid--2 container">
      <div class="skills__column">
        <h2 class="skills__title"><span class="accent-color">Hard</span> skills</h2>
        <ul class="skills__list grid scroll-effect" data-js-scroll-effect>
          <li v-for="(skill, index) in hardSkills" :key="skill" class="skills__item grid__item" :style="{ '--reveal-delay': `${(index + 1) * 0.2}s` }">
            <SkillCard :label="skill" />
          </li>
        </ul>
      </div>
      <div class="skills__column">
        <h2 class="skills__title"><span class="accent-color">Soft</span> skills</h2>
        <ul class="skills__list grid scroll-effect" data-js-scroll-effect>
          <li v-for="(skill, index) in softSkills" :key="skill" class="skills__item grid__item" :style="{ '--reveal-delay': `${(index + 1) * 0.2}s` }">
            <SkillCard :label="skill" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SkillCard from '@/components/ui/SkillCard.vue'
import { hardSkills, softSkills } from '@/utils/content'
</script>

<style lang="scss" scoped>
.skills__inner {
  column-gap: 80px;
}

@media (max-width: 1280px) {
  .skills__inner {
    gap: var(--section-padding-y);
  }
}

.scroll-effect .skills__item {
  opacity: 0;
  visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(100px, 0, 0);
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.dom-is-ready .scroll-effect .skills__item {
  transition-duration: 1.2s, 0.6s;
}

.scroll-effect--visible .skills__item {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: var(--reveal-delay, 0s);
}
</style>
