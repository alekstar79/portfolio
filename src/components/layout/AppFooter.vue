<template>
  <footer class="footer container" id="contacts">
    <div class="footer__inner card">
      <div class="footer__body">
        <div class="footer__title h2">
          Do you want to ask<br class="hidden-mobile" />
          <span class="accent-color">something interesting?</span>
        </div>
        <div class="footer__description">
          <p>Contact me. I am in touch mon-fri from 8 am to 8 pm (gmt).</p>
        </div>
      </div>
      <div class="footer__contacts">
        <SocialLinks :items="socialItems" extra-classes="footer__soc1als" />
        <div class="footer__copyright">© Alexander Lamkov, 2025</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { socialItems } from '@/utils/content'
import SocialLinks from '@/components/ui/SocialLinks.vue'
</script>

<style scoped>
.footer {
  margin-top: var(--section-padding-y);
  margin-bottom: calc(var(--section-padding-y) * 1.5);
}

@media (max-width: 767px) {
  .footer {
    margin-bottom: var(--section-padding-y);
  }
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  box-shadow: var(--box-shadow-3), var(--box-shadow-inset-transparent);
}

.is-light-theme-enabled .footer__inner {
  box-shadow: var(--box-shadow-4), var(--box-shadow-inset-transparent);
}

@media (max-width: 920px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

.footer__title {
  --marginBottom: 24px;
}

.footer__contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
}

@media (max-width: 920px) {
  .footer__contacts {
    align-items: flex-start;
  }
}
</style>
