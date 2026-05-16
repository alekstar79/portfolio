import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import type { PortfolioItem } from '@/types/content'

export function useGallery() {
  const openPortfolioItem = (items: PortfolioItem[], index: number): void => {
    const galleryItems = items.map((item) => ({
      src: `/images/projects/${item.imgName}_full.jpg`,
      type: 'image' as const,
      caption: item.title,
    }))
    Fancybox.close(true)
    Fancybox.show(galleryItems, {
      startIndex: index,
    })
  }

  return { openPortfolioItem }
}
