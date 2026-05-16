import { onMounted, onUnmounted, type Ref } from 'vue'
import { PRELOADER_FADE_AWAY_EVENT } from '@/composables/usePreloader'

export interface LiveTypingStageDefinition {
  isHideAfterTyping?: boolean
}

interface LiveTypingStageInfo {
  charsNodes: HTMLElement[]
  isHideAfterTyping: boolean
  stageNode: HTMLElement
}

const LIVE_TYPING_STAGE_SELECTOR = '[data-js-live-typing-stage]'
const LIVE_TYPING_CHAR_SELECTOR = '[data-js-live-typing-char]'
const IS_VISIBLE_CLASS = 'is-visible'
const IS_TYPING_FINISHED_CLASS = 'is-typing-finished'

export function useLiveTyping(rootRef: Ref<HTMLElement | null>) {
  const timers: number[] = []
  const cfg = {
    delayBetweenCharsTyping: 90,
    delayBetweenCharsRemoving: 35,
    delayBetweenStages: 400,
  }

  let stagesInfo: LiveTypingStageInfo[] = []
  let currentStageIndex = 0

  const schedule = (callback: () => void, delay: number): void => {
    const timerId = window.setTimeout(callback, delay)
    timers.push(timerId)
  }

  const clearTimers = (): void => {
    timers.forEach((timerId) => {
      window.clearTimeout(timerId)
    })
    timers.length = 0
  }

  const startTyping = (): void => {
    const root = rootRef.value
    if (!root) {
      return
    }

    if (currentStageIndex === stagesInfo.length) {
      root.classList.add(IS_TYPING_FINISHED_CLASS)
      return
    }

    const currentStage = stagesInfo[currentStageIndex]
    let visibleChars = 0

    currentStage.stageNode.classList.add(IS_VISIBLE_CLASS)

    currentStage.charsNodes.forEach((charNode, index) => {
      schedule(() => {
        charNode.classList.add(IS_VISIBLE_CLASS)
        visibleChars += 1

        if (visibleChars === currentStage.charsNodes.length) {
          schedule(() => {
            if (currentStage.isHideAfterTyping) {
              removeChars(currentStage)
              return
            }

            currentStageIndex += 1
            startTyping()
          }, cfg.delayBetweenStages)
        }
      }, index * cfg.delayBetweenCharsTyping)
    })
  }

  const removeChars = (stage: LiveTypingStageInfo): void => {
    const reverseChars = [...stage.charsNodes].reverse()
    let hiddenChars = 0

    reverseChars.forEach((charNode, index) => {
      schedule(() => {
        charNode.classList.remove(IS_VISIBLE_CLASS)
        hiddenChars += 1

        if (hiddenChars === reverseChars.length) {
          schedule(() => {
            stage.stageNode.classList.remove(IS_VISIBLE_CLASS)
            currentStageIndex += 1
            startTyping()
          }, cfg.delayBetweenStages)
        }
      }, index * cfg.delayBetweenCharsRemoving)
    })
  }

  const onPreloaderFadeAway = (): void => {
    schedule(() => {
      startTyping()
    }, 300)
  }

  const getStageInfo = (stageNode: HTMLElement): LiveTypingStageInfo => {
    const rawCfg = stageNode.dataset.jsLiveTypingStage
    let parsedCfg: LiveTypingStageDefinition = {}

    if (rawCfg) {
      parsedCfg = JSON.parse(rawCfg) as LiveTypingStageDefinition
    }

    return {
      charsNodes: Array.from(stageNode.querySelectorAll<HTMLElement>(LIVE_TYPING_CHAR_SELECTOR)),
      isHideAfterTyping: parsedCfg.isHideAfterTyping === true,
      stageNode,
    }
  }

  onMounted(() => {
    const root = rootRef.value
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    stagesInfo = Array.from(root.querySelectorAll<HTMLElement>(LIVE_TYPING_STAGE_SELECTOR)).map(getStageInfo)
    document.addEventListener(PRELOADER_FADE_AWAY_EVENT, onPreloaderFadeAway)
  })

  onUnmounted(() => {
    document.removeEventListener(PRELOADER_FADE_AWAY_EVENT, onPreloaderFadeAway)
    clearTimers()
  })
}
