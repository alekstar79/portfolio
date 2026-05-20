import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

export function useGallery() {
  const openSingleImage = (src: string, caption: string): void => {
    Fancybox.close(true)
    Fancybox.show(
      [
        {
          src,
          type: 'image',
          caption,
        },
      ],
      {
        infinite: false,
        Toolbar: { display: ['close'] },
        Thumbs: { show: false },
        Navigation: { show: false },
        Carousel: { infinite: false },
      } as any
    )
  }

  return { openSingleImage }
}
