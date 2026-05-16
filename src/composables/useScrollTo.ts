export function useScrollTo(closeMenu?: () => void) {
  const scrollToAnchor = (anchor: string): void => {
    closeMenu?.()
    const target = document.querySelector<HTMLElement>(anchor)
    if (!target) {
      return
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { scrollToAnchor }
}
