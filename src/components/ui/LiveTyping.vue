<template>
  <h1 ref="rootRef" class="hero__title live-typing" data-js-live-typing>
    <div class="visually-hidden">
      {{ t('hero.greeting') }} {{ t('hero.name') }} {{ t('hero.profession') }} {{ t('hero.offerPrefix') }} {{ t('hero.offerSuffix') }}
    </div>
    <div
      v-for="(stage, stageIndex) in stages"
      :key="`stage-${stageIndex}`"
      class="live-typing__stage"
      aria-hidden="true"
      :data-js-live-typing-stage="JSON.stringify({ isHideAfterTyping: Boolean(stage.isHideAfterTyping) })"
    >
      <template v-for="(part, partIndex) in stage.parts" :key="`part-${stageIndex}-${partIndex}`">
        <span v-if="part.type === 'accent'" class="accent-color">
          <span
            v-for="(char, charIndex) in part.value"
            :key="`char-${stageIndex}-${partIndex}-${charIndex}`"
            class="live-typing__char"
            data-js-live-typing-char
          >
            {{ char }}
          </span>
        </span>
        <br v-else-if="part.type === 'break'" />
        <template v-else>
          <span
            v-for="(char, charIndex) in part.value"
            :key="`char-${stageIndex}-${partIndex}-${charIndex}`"
            class="live-typing__char"
            data-js-live-typing-char
          >
            {{ char }}
          </span>
        </template>
      </template>
    </div>
  </h1>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useLiveTyping } from '@/composables/useLiveTyping'
import { useI18n } from '@/composables/useI18n'

interface LiveTypingPart {
  type: 'accent' | 'break' | 'text'
  value: string
}

interface LiveTypingStage {
  isHideAfterTyping?: boolean
  parts: LiveTypingPart[]
}

const rootRef = ref<HTMLElement | null>(null)
const { t, currentLocale } = useI18n()

const stages = computed<LiveTypingStage[]>(() => [
  {
    parts: [
      { type: 'accent', value: t('hero.greeting') },
      { type: 'text', value: ` ${t('hero.name')}` },
    ],
  },
  {
    isHideAfterTyping: true,
    parts: [{ type: 'text', value: t('hero.profession') }],
  },
  {
    parts: [
      { type: 'text', value: `${t('hero.offerPrefix')} ` },
      { type: 'break', value: '' },
      { type: 'text', value: t('hero.offerSuffix') },
    ],
  },
])

const { refreshTyping } = useLiveTyping(rootRef)

watch(currentLocale, async () => {
  await nextTick()
  refreshTyping()
})
</script>

<style scoped>
.live-typing__stage:not(.is-visible),
.live-typing__char:not(.is-visible) {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .live-typing__stage:not(.is-visible),
  .live-typing__char:not(.is-visible) {
    display: initial;
  }
}

.live-typing__stage:not(:last-child) {
  margin-bottom: 12px;
}

.live-typing__char.is-visible + .live-typing__char:not(.is-visible) {
  display: inline;
  color: transparent;
}

.live-typing__char.is-visible + .live-typing__char:not(.is-visible)::after {
  content: "|";
  color: var(--c-light);
  animation: blink 0.7s linear infinite;
}

.dom-is-ready .live-typing__char.is-visible + .live-typing__char:not(.is-visible)::after {
  transition: 0s;
}

.is-light-theme-enabled .live-typing__char.is-visible + .live-typing__char:not(.is-visible)::after {
  color: var(--c-dark);
}

@media (prefers-reduced-motion: reduce) {
  .live-typing__char.is-visible + .live-typing__char:not(.is-visible)::after {
    display: none;
  }
}
</style>
