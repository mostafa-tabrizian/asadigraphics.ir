import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

import Lightbox, {
   SlideImage,
   isImageFitCover,
   isImageSlide,
   useLightboxProps,
} from 'yet-another-react-lightbox'

import Image from 'next/image'
import { IDesign } from '@/models/design'
import { Dispatch, SetStateAction } from 'react'

const UseLightbox = ({
   designs,
   lightboxImageIndex,
   setLightboxImageIndex,
}: {
   designs: IDesign[]
   lightboxImageIndex: number
   setLightboxImageIndex: Dispatch<SetStateAction<number>>
}) => {
   return (
      <>
         {lightboxImageIndex !== -1 ? (
            <Lightbox
               slides={designs.map(({ name, frontSrc, width, height }) => {
                  return {
                     src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${frontSrc}`,
                     width,
                     height,
                     alt: name,
                  }
               })}
               styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .93)' } }}
               open={lightboxImageIndex >= 0}
               index={lightboxImageIndex}
               close={() => setLightboxImageIndex(-1)}
               render={{ slide: NextJsImage }}
            />
         ) : (
            ''
         )}
      </>
   )
}

function isNextJsImage(slide: SlideImage) {
   return isImageSlide(slide) && typeof slide.width === 'number' && typeof slide.height === 'number'
}

const NextJsImage = ({
   slide,
   rect,
}: {
   slide: SlideImage
   rect: { width: number; height: number }
}) => {
   const { imageFit } = useLightboxProps().carousel
   const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

   if (!isNextJsImage(slide)) return undefined

   const width = !cover
      ? // @ts-ignore
        Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width))
      : rect.width

   const height = !cover
      ? // @ts-ignore
        Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height))
      : rect.height

   return (
      <div style={{ position: 'relative', width, height }}>
         <Image
            fill
            alt=''
            src={slide as unknown as string}
            loading='eager'
            draggable={false}
            style={{ objectFit: cover ? 'cover' : 'contain' }}
            sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
         />
      </div>
   )
}

export default UseLightbox
