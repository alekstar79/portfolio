<template>
  <div class="flow-container">
    <AppHeader />
    <main class="content">
      <HeroSection />
      <SkillsSection />
      <PortfolioSection />
      <WorkExperienceSection />
    </main>
    <AppFooter />
    <AppPreloader />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppPreloader from '@/components/system/AppPreloader.vue'
import HeroSection from '@/views/sections/HeroSection.vue'
import PortfolioSection from '@/views/sections/PortfolioSection.vue'
import SkillsSection from '@/views/sections/SkillsSection.vue'
import WorkExperienceSection from '@/views/sections/WorkExperienceSection.vue'
import { useScrollEffects } from '@/composables/useScrollEffects'
import { useSvgSprite } from '@/composables/useSvgSprite'

useScrollEffects()
useSvgSprite()

const htmlElement = document.documentElement
let domReadyTimer: number | null = null

const handleWindowLoad = (): void => {
  if (!htmlElement.classList.contains('page-is-loaded')) {
    htmlElement.classList.add('page-is-loaded')
  }
}

onMounted(() => {
  domReadyTimer = window.setTimeout(() => {
    if (!htmlElement.classList.contains('dom-is-ready')) {
      htmlElement.classList.add('dom-is-ready')
    }
  }, 100)

  window.addEventListener('load', handleWindowLoad)

  if (document.readyState === 'complete') {
    handleWindowLoad()
  }
})

onUnmounted(() => {
  if (domReadyTimer !== null) {
    window.clearTimeout(domReadyTimer)
  }

  window.removeEventListener('load', handleWindowLoad)
})
</script>

<style lang="scss">

</style>
