<template>
  <label class="language-switcher header__language-switcher" :title="t('language.label')" @click.prevent>
    <span class="visually-hidden">{{ t('language.label') }}</span>

    <input
      class="language-switcher__checkbox visually-hidden"
      type="checkbox"
      :checked="currentLocale === 'ru'"
      aria-hidden="true"
    />
    <span class="language-switcher__body" role="group" aria-label="Language switcher">
      <button
        type="button"
        class="language-switcher__item language-switcher__item--en"
        @click.stop.prevent="setLocale('en')"
        :aria-pressed="currentLocale === 'en'"
      >
        EN
      </button>
      <button
        type="button"
        class="language-switcher__item language-switcher__item--ru"
        @click.stop.prevent="setLocale('ru')"
        :aria-pressed="currentLocale === 'ru'"
      >
        RU
      </button>
    </span>
  </label>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { currentLocale, setLocale, t } = useI18n()
</script>

<style lang="scss" scoped>
.language-switcher {
  --padding: 2px;
  --iconWrapperWidth: 42px;
  background-color: var(--c-dark);
  border: 1px solid transparent;
  border-radius: var(--border-radius-3);
  box-shadow: var(--box-shadow-3);
  cursor: pointer;
}

@media (hover: hover) {
  .language-switcher:hover {
    border-color: var(--c-accent);
  }
}

.is-light-theme-enabled .language-switcher {
  background-color: var(--c-light);
  box-shadow: var(--box-shadow-4);
}

.language-switcher__body {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--padding);
  padding: var(--padding);
  border-radius: inherit;
}

.language-switcher__body::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 2px;
  width: var(--iconWrapperWidth);
  height: var(--iconWrapperWidth);
  background-color: var(--c-white);
  border-radius: inherit;
  transform: translate3d(0, -50%, 0);
  will-change: transform;
  z-index: 0;
}

.language-switcher__checkbox:checked~.language-switcher__body::after {
  transform: translate3d(calc(var(--iconWrapperWidth) + var(--padding)), -50%, 0);
}

.language-switcher__item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--iconWrapperWidth);
  height: var(--iconWrapperWidth);
  border: none;
  background: transparent;
  color: var(--c-white);
  font-weight: 700;
  cursor: pointer;
}

.language-switcher__item--en,
.language-switcher__item--ru {
  transition: color 0.2s ease;
}

.language-switcher__checkbox:checked~.language-switcher__body .language-switcher__item--ru,
.language-switcher__checkbox:not(:checked)~.language-switcher__body .language-switcher__item--en {
  color: var(--c-dark);
}

.is-light-theme-enabled .language-switcher__item {
  color: var(--c-dark);
}

.is-light-theme-enabled .language-switcher__checkbox:checked~.language-switcher__body .language-switcher__item--ru,
.is-light-theme-enabled .language-switcher__checkbox:not(:checked)~.language-switcher__body .language-switcher__item--en {
  color: var(--c-dark);
}
</style>
