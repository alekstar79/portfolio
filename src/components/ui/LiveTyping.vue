<template>
  <h1 ref="rootRef" class="hero__title live-typing" data-js-live-typing>
    <div class="visually-hidden">
      {{ t('hero.greeting') }} {{ t('hero.name') }} {{ t('hero.profession') }} {{ t('hero.offerPrefix') }} {{
        t('hero.offerSuffix') }}
    </div>
    <div v-for="(stage, stageIndex) in stageLines" :key="`stage-${stageIndex}`" class="live-typing__stage"
      aria-hidden="true"
      :data-js-live-typing-stage="JSON.stringify({ isHideAfterTyping: Boolean(stage.isHideAfterTyping) })">
      <template v-for="(line, lineIndex) in stage.lines" :key="`line-${stageIndex}-${lineIndex}`">
        <div class="live-typing__line">
          <template v-for="(token, tokenIndex) in line.tokens" :key="`token-${stageIndex}-${lineIndex}-${tokenIndex}`">
            <span v-if="token.type === 'accent'" class="accent-color">
              <span v-for="(char, charIndex) in token.value.split('')"
                :key="`char-${stageIndex}-${lineIndex}-${tokenIndex}-${charIndex}`" class="live-typing__char"
                data-js-live-typing-char>
                {{ char }}
              </span>
            </span>
            <template v-else>
              <span v-for="(char, charIndex) in token.value.split('')"
                :key="`char-${stageIndex}-${lineIndex}-${tokenIndex}-${charIndex}`" class="live-typing__char"
                data-js-live-typing-char>
                {{ char }}
              </span>
            </template>
          </template>
        </div>
      </template>
    </div>
  </h1>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, onMounted, onUnmounted } from 'vue'
import { useLiveTyping } from '@/composables/useLiveTyping'
import { useI18n } from '@/composables/useI18n'

interface LiveTypingPart {
  type: 'accent' | 'text'
  value: string
}

// interface LiveTypingStage {
//   isHideAfterTyping?: boolean
//   parts: LiveTypingPart[]
// }

const rootRef = ref<HTMLElement | null>(null)
const { t, currentLocale } = useI18n()

interface LiveTypingToken {
  type: 'accent' | 'text'
  value: string
}

interface LiveTypingLine {
  tokens: LiveTypingToken[]
}

interface FormattedLiveTypingStage {
  isHideAfterTyping?: boolean
  lines: LiveTypingLine[]
}

interface RawLiveTypingStage {
  isHideAfterTyping?: boolean
  parts: LiveTypingPart[]
}

const buildRawStages = (): RawLiveTypingStage[] => [
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
    parts: [{ type: 'text', value: `${t('hero.offerPrefix')} ${t('hero.offerSuffix')}` }],
  },
]

const stageLines = ref<FormattedLiveTypingStage[]>([])
const layoutCanvas = document.createElement('canvas')
const layoutContext = layoutCanvas.getContext('2d')

const getFontFromElement = (element: HTMLElement): string => {
  const style = getComputedStyle(element)
  return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
}

const getTokenWidth = (token: string, font: string): number => {
  if (!layoutContext) return token.length * 10
  layoutContext.font = font
  return layoutContext.measureText(token).width
}

const splitTextIntoTokens = (value: string, type: LiveTypingToken['type']): LiveTypingToken[] => {
  const segments = value.match(/\s+|\S+/g) ?? []

  return segments.map((segment) => ({
    type,
    value: segment,
  }))
}

const getLineWidth = (tokens: LiveTypingToken[], font: string): number => {
  return tokens.reduce((sum, token) => sum + getTokenWidth(token.value, font), 0)
}

const rebalanceLines = (lines: LiveTypingLine[], maxWidth: number, font: string): LiveTypingLine[] => {
  const result = [...lines]

  for (let i = 0; i + 1 < result.length; i += 1) {
    const currentLine = result[i]
    const nextLine = result[i + 1]

    if (currentLine.tokens.length === 1 && nextLine.tokens.length > 1) {
      const nextToken = nextLine.tokens[0]
      const candidateWidth = getLineWidth(currentLine.tokens, font) + getTokenWidth(nextToken.value, font)

      if (candidateWidth <= maxWidth) {
        currentLine.tokens.push(nextToken)
        nextLine.tokens.shift()

        if (nextLine.tokens.length === 0) {
          result.splice(i + 1, 1)
        }
      }
    }
  }

  return result
}

const buildLineTokens = (parts: LiveTypingPart[], maxWidth: number, font: string): LiveTypingLine[] => {
  const tokens = parts.flatMap((part) => splitTextIntoTokens(part.value, part.type))
  const lines: LiveTypingLine[] = []
  let currentLine: LiveTypingToken[] = []
  let currentWidth = 0

  const commitLine = (): void => {
    if (currentLine.length) {
      lines.push({ tokens: currentLine })
      currentLine = []
      currentWidth = 0
    }
  }

  for (const token of tokens) {
    const tokenWidth = getTokenWidth(token.value, font)

    if (!currentLine.length) {
      if (!token.value.trim()) {
        continue
      }
      currentLine = [token]
      currentWidth = tokenWidth
      continue
    }

    if (currentWidth + tokenWidth <= maxWidth) {
      currentLine.push(token)
      currentWidth += tokenWidth
      continue
    }

    commitLine()
    currentLine = [
      {
        type: token.type,
        value: token.value.trimStart(),
      },
    ]
    currentWidth = getTokenWidth(currentLine[0].value, font)
  }

  commitLine()
  return rebalanceLines(lines, maxWidth, font)
}

const updateStageLines = (): void => {
  const root = rootRef.value
  if (!root) {
    return
  }

  const maxWidth = Math.max(root.getBoundingClientRect().width, 0)
  const font = getFontFromElement(root)

  if (maxWidth === 0) {
    return
  }

  stageLines.value = buildRawStages().map((stage) => ({
    isHideAfterTyping: stage.isHideAfterTyping,
    lines: buildLineTokens(stage.parts, maxWidth, font),
  }))
}

const { restartTyping, refreshTyping } = useLiveTyping(rootRef)

const startRenderedTyping = async (): Promise<void> => {
  await nextTick()
  updateStageLines()
  await nextTick()
  await restartTyping()
}

watch(currentLocale, async () => {
  await nextTick()
  updateStageLines()
  await nextTick()
  refreshTyping()
})

const onResize = async (): Promise<void> => {
  updateStageLines()
  await nextTick()
  refreshTyping()
}

onMounted(() => {
  startRenderedTyping()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style lang="scss" scoped>
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

.live-typing__stage {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.live-typing__line {
  display: inline-block;
  white-space: nowrap;
}

.live-typing__stage:not(:last-child) {
  margin-bottom: 12px;
}

.live-typing__line+.live-typing__line {
  margin-top: 8px;
}

.live-typing__char.is-visible+.live-typing__char:not(.is-visible) {
  display: inline;
  color: transparent;
}

.live-typing__char.is-visible+.live-typing__char:not(.is-visible)::after {
  content: "|";
  color: var(--c-light);
  animation: blink 0.7s linear infinite;
}

.dom-is-ready .live-typing__char.is-visible+.live-typing__char:not(.is-visible)::after {
  transition: 0s;
}

.is-light-theme-enabled .live-typing__char.is-visible+.live-typing__char:not(.is-visible)::after {
  color: var(--c-dark);
}

@media (prefers-reduced-motion: reduce) {
  .live-typing__char.is-visible+.live-typing__char:not(.is-visible)::after {
    display: none;
  }
}
</style>
