import { onMounted, onUnmounted, type Ref, nextTick } from 'vue'
import { PRELOADER_FADE_AWAY_EVENT } from '@/composables/usePreloader'

export interface LiveTypingStageDefinition {
  isHideAfterTyping?: boolean
}

interface LiveTypingStageInfo {
  charsNodes: HTMLElement[]
  isHideAfterTyping: boolean
  stageNode: HTMLElement
}

interface LiveTypingStageState {
  visibleChars: number
  isFullyVisible: boolean
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
    delayBetweenStages: 700, // increased from 400 for clear visual separation between phases
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

  const cleanupVisibleClasses = (): void => {
    const root = rootRef.value
    if (!root) {
      return
    }

    root.querySelectorAll<HTMLElement>(`.${IS_VISIBLE_CLASS}`).forEach((node) => {
      node.classList.remove(IS_VISIBLE_CLASS)
    })
    root.querySelectorAll<HTMLElement>(`.${IS_TYPING_FINISHED_CLASS}`).forEach((node) => {
      node.classList.remove(IS_TYPING_FINISHED_CLASS)
    })
  }

  const measureStageState = (): LiveTypingStageState[] => {
    return stagesInfo.map((stage) => {
      const visibleChars = stage.charsNodes.filter((node) => node.classList.contains(IS_VISIBLE_CLASS)).length

      return {
        visibleChars,
        isFullyVisible: visibleChars === stage.charsNodes.length,
      }
    })
  }

  const updateStageInfo = (previousStageStates: LiveTypingStageState[] = []): void => {
    const root = rootRef.value
    if (!root) {
      stagesInfo = []
      return
    }

    const nextStagesInfo = Array.from(root.querySelectorAll<HTMLElement>(LIVE_TYPING_STAGE_SELECTOR)).map(getStageInfo)

    if (previousStageStates.length) {
      nextStagesInfo.forEach((stage, index) => {
        const previousState = previousStageStates[index]
        if (!previousState) {
          return
        }

        const visibleCount = previousState.isFullyVisible
          ? stage.charsNodes.length
          : Math.min(previousState.visibleChars, stage.charsNodes.length)

        if (visibleCount > 0) {
          stage.stageNode.classList.add(IS_VISIBLE_CLASS)
        }

        stage.charsNodes.slice(0, visibleCount).forEach((node) => {
          node.classList.add(IS_VISIBLE_CLASS)
        })
      })
    }

    stagesInfo = nextStagesInfo
  }

  const continueTyping = (previousStageStates: LiveTypingStageState[] = []): void => {
    const root = rootRef.value
    if (!root || currentStageIndex >= stagesInfo.length) {
      return
    }

    const currentStage = stagesInfo[currentStageIndex]
    const previousState = previousStageStates[currentStageIndex]
    const visibleCount = previousState
      ? previousState.isFullyVisible
        ? currentStage.charsNodes.length
        : Math.min(previousState.visibleChars, currentStage.charsNodes.length)
      : 0

    if (currentStage.charsNodes.length === 0) {
      startTyping()
      return
    }

    currentStage.stageNode.classList.add(IS_VISIBLE_CLASS)

    if (visibleCount === currentStage.charsNodes.length) {
      schedule(() => {
        if (currentStage.isHideAfterTyping) {
          removeChars(currentStage)
          return
        }

        currentStageIndex += 1
        startTyping()
      }, cfg.delayBetweenStages)
      return
    }

    currentStage.charsNodes.slice(visibleCount).forEach((charNode, index) => {
      schedule(() => {
        charNode.classList.add(IS_VISIBLE_CLASS)

        if (visibleCount + index + 1 === currentStage.charsNodes.length) {
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

  const startTyping = (): void => {
    const root = rootRef.value
    if (!root) {
      return
    }

    if (stagesInfo.length === 0) {
      // nothing ready yet — try to refresh info and retry shortly
      try {
        updateStageInfo()
      } catch (e) { }
      // schedule retry
      schedule(() => startTyping(), 200)
      return
    }

    if (currentStageIndex === stagesInfo.length) {
      root.classList.add(IS_TYPING_FINISHED_CLASS)
      return
    }

    const currentStage = stagesInfo[currentStageIndex]
    if (!currentStage) {
      // defensive: no stage found for current index
      // try to refresh and retry
      try {
        updateStageInfo()
      } catch (e) { }
      schedule(() => startTyping(), 200)
      return
    }

    let visibleChars = 0

    // mark stage visible
    currentStage.stageNode.classList.add(IS_VISIBLE_CLASS)

    // If stage has no chars, handle immediately according to config
    if (!currentStage.charsNodes.length) {
      if (currentStage.isHideAfterTyping) {
        // nothing to remove, proceed to next stage after short delay
        schedule(() => {
          currentStage.stageNode.classList.remove(IS_VISIBLE_CLASS)
          currentStageIndex += 1
          startTyping()
        }, cfg.delayBetweenStages)
        return
      }

      currentStageIndex += 1
      schedule(() => startTyping(), cfg.delayBetweenStages)
      return
    }

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

    if (!reverseChars.length) {
      // nothing to remove — finalize stage immediately
      schedule(() => {
        stage.stageNode.classList.remove(IS_VISIBLE_CLASS)
        currentStageIndex += 1
        startTyping()
      }, cfg.delayBetweenStages)
      return
    }

    reverseChars.forEach((charNode, index) => {
      schedule(() => {
        charNode.classList.remove(IS_VISIBLE_CLASS)
        hiddenChars += 1

        if (hiddenChars === reverseChars.length) {
          // hide current stage
          schedule(() => {
            stage.stageNode.classList.remove(IS_VISIBLE_CLASS)
          }, cfg.delayBetweenStages)
          // after stage is hidden, proceed to next stage with small gap for browser render
          schedule(() => {
            currentStageIndex += 1
            startTyping()
          }, cfg.delayBetweenStages + 50)
        }
      }, index * cfg.delayBetweenCharsRemoving)
    })
  }

  const onPreloaderFadeAway = (): void => {
    schedule(async () => {
      // ensure stages are (re)built before starting
      try {
        // call restartTyping to rebuild and start after DOM updates
        await restartTyping()
      } catch (e) {
        schedule(() => startTyping(), 300)
      }
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

  const restartTyping = async (): Promise<void> => {
    const root = rootRef.value
    if (!root) {
      return
    }

    clearTimers()
    cleanupVisibleClasses()
    currentStageIndex = 0

    // wait for DOM to settle (stages rendered)
    try {
      await nextTick()
    } catch (e) { }

    updateStageInfo()

    // ensure update applied
    try {
      await nextTick()
    } catch (e) { }

    startTyping()
  }

  const refreshTyping = (): void => {
    const previousStageStates = measureStageState()
    clearTimers()
    cleanupVisibleClasses()
    updateStageInfo(previousStageStates)
    continueTyping(previousStageStates)
  }

  onMounted(() => {
    const root = rootRef.value
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    updateStageInfo()
    document.addEventListener(PRELOADER_FADE_AWAY_EVENT, onPreloaderFadeAway)
  })

  onUnmounted(() => {
    document.removeEventListener(PRELOADER_FADE_AWAY_EVENT, onPreloaderFadeAway)
    clearTimers()
  })

  return { restartTyping, refreshTyping }
}
