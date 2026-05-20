import { onMounted } from 'vue'
import { assetUrl } from '@/utils/paths'

const SVG_GRAPHIC_SELECTOR = 'path, circle, rect, polygon, ellipse, line, polyline'
const MONO_SUFFIX = '-mono'

function makeGraphicMonochrome(node: SVGElement): void {
  const fillValue = node.getAttribute('fill')
  const strokeValue = node.getAttribute('stroke')

  node.removeAttribute('style')

  if (fillValue === null) {
    if (!['line', 'polyline'].includes(node.tagName)) {
      node.setAttribute('fill', 'currentColor')
    }
  } else if (fillValue !== 'none') {
    node.setAttribute('fill', 'currentColor')
  }

  if (strokeValue && strokeValue !== 'none') {
    node.setAttribute('stroke', 'currentColor')
  }
}

function convertFillToCurrentColor(node: SVGElement): void {
  const fillValue = node.getAttribute('fill')
  const strokeValue = node.getAttribute('stroke')

  node.removeAttribute('style')

  if (fillValue && fillValue !== 'none') {
    node.setAttribute('fill', 'currentColor')
  } else if (!fillValue && !['line', 'polyline'].includes(node.tagName)) {
    node.setAttribute('fill', 'currentColor')
  }

  if (strokeValue && strokeValue !== 'none') {
    node.setAttribute('stroke', 'currentColor')
  }
}

function createMonochromeVariant(symbolNode: SVGSymbolElement): SVGSymbolElement {
  const monoSymbol = symbolNode.cloneNode(true) as SVGSymbolElement
  monoSymbol.id = `${symbolNode.id}${MONO_SUFFIX}`

  monoSymbol.querySelectorAll<SVGElement>(SVG_GRAPHIC_SELECTOR).forEach((node) => {
    makeGraphicMonochrome(node)
  })

  return monoSymbol
}

function enrichSpriteWithVariants(spriteRoot: ParentNode): void {
  const defsNode = spriteRoot.querySelector('defs')
  if (!defsNode) {
    return
  }

  const symbols = Array.from(defsNode.querySelectorAll<SVGSymbolElement>('symbol'))
  symbols.forEach((symbolNode) => {
    symbolNode.querySelectorAll<SVGElement>(SVG_GRAPHIC_SELECTOR).forEach((node) => {
      convertFillToCurrentColor(node)
    })

    const monoId = `${symbolNode.id}${MONO_SUFFIX}`
    if (!defsNode.querySelector(`#${monoId}`)) {
      defsNode.appendChild(createMonochromeVariant(symbolNode))
    }
  })
}

export function useSvgSprite() {
  onMounted(async () => {
    if (document.getElementById('svg-sprite')) {
      return
    }

    const response = await fetch(assetUrl('icons.svg'))
    if (!response.ok) {
      return
    }

    const svg = await response.text()
    const sprite = document.createElement('div')
    sprite.id = 'svg-sprite'
    sprite.className = 'visually-hidden'
    sprite.innerHTML = svg

    enrichSpriteWithVariants(sprite)

    document.body.appendChild(sprite)
  })
}
