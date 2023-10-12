import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

import Lightbox, {
   SlideImage,
   isImageFitCover,
   isImageSlide,
   useLightboxProps,
} from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IPhoto } from './gallery'

const UseLightbox = ({
   designData,
   setDesignData,
}: {
   designData: IPhoto
   setDesignData: Dispatch<SetStateAction<IPhoto | null>>
}) => {
   const [lightBoxSlides, setLightboxSlides] = useState<
      { src: string; width: number; height: number; alt: string }[]
   >([])

   const baseURL = 'https://tabrizian.storage.iran.liara.space/asadi_designs/designs/'
   const width = designData.width
   const height = designData.height
   const alt = designData.alt

   useEffect(() => {
      setLightboxSlides([])
      const newLightboxSlides = []
      newLightboxSlides.push({
         src: designData.src,
         width,
         height,
         alt,
      })
      if (designData.backSrc) {
         newLightboxSlides.push({
            src: `${baseURL}${designData.backSrc}`,
            width,
            height,
            alt,
         })
      }
      designData.gallery.map((src) => {
         newLightboxSlides.push({
            src: `${baseURL}${src}`,
            width,
            height,
            alt,
         })
      })
      setLightboxSlides(newLightboxSlides)
   }, [alt, designData, height, width])

   return (
      <>
         {designData ? (
            <Lightbox
               slides={lightBoxSlides}
               styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .93)' } }}
               open={Boolean(designData)}
               close={() => setDesignData(null)}
               render={{ slide: NextJsImage }}
               plugins={[Thumbnails]}
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
