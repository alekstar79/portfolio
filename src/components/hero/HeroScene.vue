<template>
  <div class="hero-scene scroll-effect" data-js-scroll-effect>
    <div class="laptop-bottom-panel">
      <div class="laptop-bottom-panel__shadow"></div>
      <div class="laptop-bottom-panel__base"></div>
      <div class="laptop-bottom-panel__keyboard">
        <button
          v-for="index in 70"
          :key="index"
          class="laptop-bottom-panel__key"
          :class="getKeyboardClass(index - 1)"
          type="button"
          tabindex="-1"
          aria-hidden="true"
        ></button>
      </div>
      <div class="laptop-bottom-panel__shine"></div>
    </div>
    <div class="laptop-top-panel">
      <div class="laptop-top-panel__base"></div>
      <div class="laptop-top-panel__screen"></div>
      <div class="laptop-top-panel__shine"></div>
    </div>
    <!-- UML Diagram -->
    <div class="uml-diagram">
      <div class="uml-diagram__ellipse uml-diagram__ellipse--top"></div>
      <div class="uml-diagram__direction-arrow uml-diagram__direction-arrow--top"></div>
      <div class="uml-diagram__rhombus">&lt;\&gt;</div>
      <div class="uml-diagram__direction-arrow uml-diagram__direction-arrow--left"></div>
      <div class="uml-diagram__direction-line uml-diagram__direction-line--top-left"></div>
      <div class="uml-diagram__direction-line uml-diagram__direction-line--top-right"></div>
      <div class="uml-diagram__direction-arrow uml-diagram__direction-arrow--right"></div>
      <div class="uml-diagram__rectangle uml-diagram__rectangle--left"></div>
      <div class="uml-diagram__rectangle uml-diagram__rectangle--right"></div>
      <div class="uml-diagram__direction-line uml-diagram__direction-line--bottom"></div>
      <div class="uml-diagram__direction-line uml-diagram__direction-line--bottom-left"></div>
      <div class="uml-diagram__direction-line uml-diagram__direction-line--bottom-right"></div>
      <div class="uml-diagram__direction-arrow uml-diagram__direction-arrow--bottom"></div>
      <div class="uml-diagram__ellipse uml-diagram__ellipse--bottom"></div>
    </div>
    <!-- Code Signs -->
    <div class="code-signs">
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--tag">&lt;\&gt;</div>
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--ts">TS</div>
      <div class="code-signs__sign code-signs__sign--right code-signs__sign--react">Vue</div>
      <div class="code-signs__sign code-signs__sign--right code-signs__sign--postcss">PostCSS</div>
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--js">JS</div>
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--stars">******</div>
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--triangles">
        <span class="code-signs__triangle"></span>
        <span class="code-signs__triangle"></span>
        <span class="code-signs__triangle"></span>
        <span class="code-signs__triangle"></span>
        <span class="code-signs__triangle"></span>
      </div>
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--gear">
        <AppIcon name="gear" />
      </div>
      <div class="code-signs__sign code-signs__sign--left code-signs__sign--search">
        <AppIcon name="search" />
      </div>
      <div class="code-signs__sign code-signs__sign--right code-signs__sign--idea">
        <AppIcon name="idea" />
      </div>
      <div class="code-signs__sign code-signs__sign--right code-signs__sign--shield">
        <AppIcon name="shield" />
      </div>
    </div>
    <!-- Code Panel -->
    <div class="code-panel">
      <div v-for="index in 116" :key="index" class="code-panel__word" :class="getWordClass(index - 1)"></div>
    </div>
    <!-- Byte Code -->
    <div class="byte-code">
      <span v-for="(char, index) in byteCodeString" :key="index" class="byte-code__char">{{ char }}</span>
    </div>
    <!-- Hero Slider -->
    <div class="hero-slider" ref="sliderRoot" data-js-slider>
      <button class="hero-slider__button hero-slider__button--prev" type="button" title="To prev slide" aria-label="To prev slide">
        <AppIcon name="arrow-left" />
      </button>
      <div class="hero-slider__inner swiper">
        <ul class="hero-slider__list swiper-wrapper">
          <li v-for="icon in heroSliderIcons" :key="icon" class="hero-slider__item swiper-slide">
            <div class="hero-slider__icon-wrapper">
              <AppIcon :name="icon" />
            </div>
          </li>
        </ul>
      </div>
      <button class="hero-slider__button hero-slider__button--next" type="button" title="To next slide" aria-label="To next slide">
        <AppIcon name="arrow-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { useHeroSlider } from '@/composables/useHeroSlider'

const heroSliderIcons = ['html', 'css', 'javascript', 'react', 'redux', 'typescript', 'webpack', 'postcss', 'ejs']
const byteCodeString = '11010001100101110110011011001101111'

const oneAndHalf = [0, 25, 26, 50, 63]
const twice = [39]
const twiceAndHalf = [51]
const fourteen = [66]

const wordTwo = [1, 5, 7, 9, 10, 11, 12, 14, 16, 19, 20, 25, 26, 27, 29, 31, 33, 36, 38, 40, 42, 45, 47, 52, 55, 57]
const wordThree = [13, 21, 35, 39, 47, 51, 58]
const wordFour = [0, 8, 34]
const wordYellow = [0, 8, 21, 34, 35, 47]
const wordBright = [1, 9, 13, 15, 16, 30, 41, 46, 55, 56]
const wordTransparent = [6, 7, 12, 18, 19, 26, 32, 33, 37, 38, 44, 45, 52, 58]

const getKeyboardClass = (index: number): string[] => {
  const classes: string[] = []
  if (oneAndHalf.includes(index)) classes.push('laptop-bottom-panel__key--3')
  if (twice.includes(index)) classes.push('laptop-bottom-panel__key--4')
  if (twiceAndHalf.includes(index)) classes.push('laptop-bottom-panel__key--5')
  if (fourteen.includes(index)) classes.push('laptop-bottom-panel__key--14')
  return classes
}

const hasIndexInLoop = (index: number, list: number[]): boolean => {
  if (list.includes(index)) return true
  return index > 58 && list.includes(index - 59)
}

const getWordClass = (index: number): string[] => {
  const classes: string[] = []
  if (hasIndexInLoop(index, wordTwo)) classes.push('code-panel__word--2')
  if (hasIndexInLoop(index, wordThree)) classes.push('code-panel__word--3')
  if (hasIndexInLoop(index, wordFour)) classes.push('code-panel__word--4')
  if (hasIndexInLoop(index, wordYellow)) classes.push('code-panel__word--yellow-color')
  if (hasIndexInLoop(index, wordBright)) classes.push('code-panel__word--bright-color')
  if (hasIndexInLoop(index, wordTransparent)) classes.push('code-panel__word--transparent-color')
  return classes
}

const { sliderRoot } = useHeroSlider()
</script>

<style lang="scss" scoped>
// Hero scene container
.hero-scene {
  --size: 600px;
  --borderRadius: 20px;
  --transition-timing-function: ease;
  --base-transition-duration: 0.3s;
  --delay: 0s;

  font-size: 16px;
  height: var(--size);
  pointer-events: none;
  position: relative;
  width: var(--size);
  will-change: transform;

  @media (max-width: 1280px) {
    font-size: 13px;
  }

  @media (max-width: 767px) {
    --borderRadius: 15px;
  }

  @media (max-width: 640px) {
    font-size: 9px;
  }

  // Enable pointer events for interactive elements inside
  > * {
    pointer-events: auto;
  }
}

// Laptop panels and UML elements positioning
.code-signs > *,
.laptop-bottom-panel > *,
.laptop-top-panel > *,
.uml-diagram > * {
  position: absolute;
}

// Laptop top panel
.laptop-top-panel {
  pointer-events: none;
  overflow: hidden;
}

.laptop-top-panel__base {
  border-radius: var(--borderRadius);
  will-change: transform;
}

.laptop-top-panel__screen {
  will-change: transform;
}

.laptop-top-panel__shine {
  height: 31%;
  left: 25%;
  top: 0;
  width: 32%;
  will-change: transform;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #dc3daa 0,
    #bb3491 5%,
    #8f286f 13%,
    #691d51 21%,
    #481438 30%,
    #2e0d23 40%,
    #190714 50%,
    #0b0308 62%,
    #030102 77%,
    #000 100%
  );
  background-blend-mode: color-dodge;
  mix-blend-mode: color-dodge;

  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition-property: opacity, transform;
    transition-timing-function: var(--transition-timing-function);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .dom-is-ready .scroll-effect & {
    transition-duration: 2s, 0.6s;
  }

  .scroll-effect--visible & {
    opacity: 1;
    transform: none;
    transition-delay: var(--delay);
    visibility: visible;
  }

  @for $i from 1 through 20 {
    .scroll-effect--visible &:nth-child(#{$i}) {
      --delay: #{($i - 1) * 0.25}s;
    }
  }
}

// Laptop bottom panel
.laptop-bottom-panel {
  overflow: hidden;

  > * {
    will-change: transform;
  }
}

.laptop-bottom-panel__base {
  --shadowSize: 10px;

  background: linear-gradient(90deg, #3d065f, #5f27bd);
  border: calc(var(--shadowSize) / 2) solid #2c1458;
  box-shadow: var(--shadowSize) var(--shadowSize) 0 0 #10054d;
  top: 52.3%;
}

.laptop-bottom-panel__keyboard {
  background: linear-gradient(13.47deg, #3d065f 795.72%, #10054d 10150.27%);
  border-radius: 10px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(27, 1fr);
  grid-template-rows: 5px;
  height: 15.3%;
  left: 30.4%;
  padding: 1.5%;
  top: 57.3%;
  width: 39.1%;
}

.laptop-bottom-panel__key {
  --columns: 2;
  --shadowSize: 1.5px;

  background-color: #6a3689;
  border-radius: 3px;
  box-shadow: var(--shadowSize) var(--shadowSize) 0 0 #8a58a5;
  cursor: pointer;
  grid-column: span var(--columns);

  // Key size modifiers
  &--3 {
    --columns: 3;
  }

  &--4 {
    --columns: 4;
  }

  &--5 {
    --columns: 5;
  }

  &--14 {
    --columns: 14;
  }
}

.laptop-bottom-panel__shine {
  height: 18%;
  left: 48%;
  top: 79%;
  width: 16%;
  will-change: transform;
  background: radial-gradient(
    50% 49.71% at 50.04% 58.03%,
    #972a74 0,
    #8a266a 4%,
    #601b4a 19%,
    #3d112f 35%,
    #230a1b 51%,
    #0f040c 67%,
    #040103 83%,
    #000 100%
  );
  background-blend-mode: color-dodge;
  mix-blend-mode: color-dodge;

  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition-property: opacity, transform;
    transition-timing-function: var(--transition-timing-function);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .dom-is-ready .scroll-effect & {
    transition-duration: 2s, 0.6s;
  }

  .scroll-effect--visible & {
    opacity: 1;
    transform: none;
    transition-delay: var(--delay);
    visibility: visible;
  }

  @for $i from 1 through 20 {
    .scroll-effect--visible &:nth-child(#{$i}) {
      --delay: #{($i - 1) * 0.25}s;
    }
  }
}

// UML Diagram
.uml-diagram {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  pointer-events: none;
  transform-origin: 50% 25%;
  will-change: transform;

  // OPTIMIZE: Convert 70 nth-child delay rules to CSS variable instead of repeating
  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition-property: opacity, transform;
    transition-timing-function: var(--transition-timing-function);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .dom-is-ready .scroll-effect & {
    transition-duration: 2s, 0.6s;

    > * {
      transition: var(--base-transition-duration);
    }
  }

  .scroll-effect--visible & {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: var(--delay);
  }

  // Individual delay rules for UML diagram children
  @for $i from 1 through 70 {
    .scroll-effect--visible &:nth-child(#{$i}) {
      --delay: #{($i - 1) * 0.25}s;
    }
  }

  // UML elements transformation
  > * {
    transform: rotate(35deg) skew(35deg, -5deg);
    will-change: transform;

    @media (hover: hover) {
      &:hover {
        transform: rotate(35deg) skew(35deg, -5deg) scale(1.05) translateZ(0);
      }
    }
  }
}

// Code Signs
.code-signs {
  pointer-events: none;

  .dom-is-ready & {
    transition: 2s;
  }

  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transition-delay: 0.5s;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .scroll-effect--visible & {
    opacity: 1;
    visibility: visible;
  }
}

.code-signs__sign {
  align-items: center;
  color: #651ab1;
  display: flex;
  font-size: 1.875em;
  font-weight: 700;
  line-height: 1;
  mix-blend-mode: color-dodge;
  padding: 0.5% 1%;
  pointer-events: none;
  transform: rotate(35deg) skew(35deg, -5deg);
}

// Code Panel
.code-panel {
  --wordDefaultWidth: 5px;
  --delay: 0s;

  backdrop-filter: blur(40px);
  background: linear-gradient(
    165.08deg,
    rgba(73, 116, 201, 0.64) -10.2%,
    rgba(98, 71, 202, 0.64) 49.62%,
    rgba(108, 35, 182, 0.64) 113.6%
  );
  border: 1px solid rgba(205, 106, 232, 0.8);
  border-bottom: none;
  border-left: none;
  border-radius: 15px;
  display: grid;
  gap: 2px 5px;
  grid-template-columns: repeat(12, var(--wordDefaultWidth));
  height: 26.3%;
  left: 23%;
  overflow: hidden;
  padding: 2.5% 3%;
  pointer-events: none;
  position: absolute;
  top: 28%;
  transform: rotate(35deg) skew(35deg, -5deg);
  will-change: transform;

  @media (max-width: 1280px) {
    --wordDefaultWidth: 4px;
  }

  @media (max-width: 640px) {
    --wordDefaultWidth: 3px;
    border-radius: 10px;
    gap: 1px 3px;
  }

  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, transform;
    transition-timing-function: var(--transition-timing-function);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .dom-is-ready .scroll-effect & {
    transition-duration: 2s, 0.6s;
  }

  .scroll-effect--visible & {
    opacity: 0.8;
    transform: rotate(35deg) skew(35deg, -5deg);
    transition-delay: var(--delay);
    visibility: visible;
  }

  // OPTIMIZE: Generate nth-child delay rules for code panel
  @for $i from 1 through 70 {
    .scroll-effect--visible &:nth-child(#{$i}) {
      --delay: #{($i - 1) * 0.25}s;
    }
  }
}

.code-panel__word {
  --columns: 1;

  background: linear-gradient(90deg, #3d065f 34880%, #5f27bd 35227%);
  background-blend-mode: color-dodge;
  grid-column: span var(--columns);
  height: 3px;
  mix-blend-mode: color-dodge;
  transform-origin: 0 50%;
  will-change: transform;

  &--2 {
    --columns: 2;
  }

  &--3 {
    --columns: 3;
  }

  &--4 {
    --columns: 4;
  }

  &--yellow-color {
    background: linear-gradient(90deg, #ffd700 34880%, #ffed4e 35227%);
  }

  &--bright-color {
    background: linear-gradient(90deg, #fff9d8 34880%, #fffaeb 35227%);
  }

  &--transparent-color {
    background: linear-gradient(90deg, rgba(255, 217, 0, 0.5) 34880%, rgba(255, 237, 78, 0.5) 35227%);
  }
}

// Byte Code
.byte-code {
  --delay: 0s;

  color: #6422c9;
  display: grid;
  font-weight: 400;
  gap: 4px 2px;
  grid-template-columns: repeat(5, 1fr);
  left: 68.7%;
  line-height: 1;
  overflow: hidden;
  position: absolute;
  top: 36.7%;
  will-change: transform;

  @media (max-width: 640px) {
    gap: 2px 1px;
  }

  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transform: rotate(35deg) skew(35deg, -5deg) translate3d(0, -100px, 0);
    transition-property: opacity, transform;
    transition-timing-function: ease;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .dom-is-ready .scroll-effect & {
    transition-duration: 2s, 1.4s;
  }

  .scroll-effect--visible & {
    opacity: 1;
    transform: rotate(35deg) skew(35deg, -5deg);
    transition-delay: var(--delay);
    visibility: visible;
  }

  // OPTIMIZE: Generate nth-child delay rules for byte code
  @for $i from 1 through 70 {
    .scroll-effect--visible &:nth-child(#{$i}) {
      --delay: #{($i - 1) * 0.25}s;
    }
  }
}

.byte-code__char {
  // Character styling
}

// Hero Slider
.hero-slider {
  --slideSize: 32px;
  --marginX: 8px;
  --slidesPerView: 4;
  --shadowSize: 5px;
  --delay: 0s;

  align-items: center;
  background: linear-gradient(
    165.08deg,
    rgba(73, 116, 201, 0.64) -10.2%,
    rgba(98, 71, 202, 0.64) 49.62%,
    rgba(108, 35, 182, 0.64) 113.6%
  );
  border-radius: calc(var(--borderRadius) * 1.75);
  box-shadow: var(--shadowSize) calc(var(--shadowSize) * -1) 0 0 rgba(43, 15, 145, 0.64);
  display: flex;
  justify-content: space-between;
  left: 53%;
  padding: 2%;
  position: absolute;
  top: 54%;
  will-change: transform;

  @media (max-width: 767px) {
    --shadowSize: 3px;
    padding: 1%;
  }

  @media (max-width: 640px) {
    --slideSize: 24px;
    --marginX: 4px;
    --slidesPerView: 3;
  }

  .scroll-effect & {
    opacity: 0;
    visibility: hidden;
    transform: rotate(35deg) skew(35deg, -5deg) translate3d(100px, 0, 0);
    transition-property: opacity, transform;
    transition-timing-function: ease;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .dom-is-ready .scroll-effect & {
    transition-duration: 2.4s, 1.2s;
  }

  .scroll-effect--visible & {
    opacity: 1;
    transform: rotate(35deg) skew(35deg, -5deg);
    transition-delay: var(--delay);
    visibility: visible;
  }

  // OPTIMIZE: Generate nth-child delay rules for hero slider
  @for $i from 1 through 70 {
    .scroll-effect--visible &:nth-child(#{$i}) {
      --delay: #{($i - 1) * 0.25}s;
    }
  }
}

.hero-slider__button {
  --size: 28px;

  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: var(--size);
  justify-content: center;
  width: var(--size);
  will-change: transform;

  @media (max-width: 767px) {
    --size: 24px;
  }

  &:active {
    transform: scale(1.05) translateZ(0);
  }

  .i-icon {
    --color: hsla(0, 0%, 100%, 0.64);
  }

  @media (hover: hover) {
    &:hover .i-icon {
      --color: var(--c-accent);
    }
  }
}

.hero-slider__inner {
  margin-left: var(--marginX);
  margin-right: var(--marginX);
  max-width: calc(var(--slideSize) * var(--slidesPerView) + var(--marginX) * (var(--slidesPerView) - 1));
}

.hero-slider__list {
  // Swiper wrapper styling handled by Swiper library
}

.hero-slider__item {
  max-width: var(--slideSize);
}

.hero-slider__icon-wrapper {
  align-items: center;
  background-color: #f2a78c;
  border-radius: 50%;
  display: flex;
  height: var(--slideSize);
  justify-content: center;
  width: var(--slideSize);

  .dom-is-ready & {
    transition: var(--base-transition-duration);
  }

  .i-icon {
    --size: 60%;
    --color: #fff9d8;
  }

  @media (hover: hover) {
    &:hover {
      background-color: var(--c-accent);
    }
  }
}
</style>
