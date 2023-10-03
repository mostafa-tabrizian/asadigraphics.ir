'use client'

import 'lightbox.js-react/dist/index.css'
import dynamic from 'next/dynamic'
import Image from 'next/legacy/image'
import { useEffect, useState } from 'react'

const DynamicSlideshowLightbox = dynamic(
   () => import('lightbox.js-react').then((res) => res.SlideshowLightbox),
   { ssr: false },
)

type ImageProps = {
   params: {
      name: string
      thumbnail: string
      images: string[]
   }
}

type TGallery = {
   src: string
   alt: string
}[]

const Images = ({ params: { name, thumbnail, images } }: ImageProps) => {
   const [lightboxDynamicActive, setLightboxDynamicActive] = useState(false)
   const [lightboxOpen, setLightboxOpen] = useState(false)
   const [galleryList, setGalleryList] = useState<TGallery>([])
   const [currentImageIndex, setCurrentIndex] = useState(0)

   useEffect(() => {
      return () => {
         setGalleryList([])
         setLightboxOpen(false)
         setLightboxDynamicActive(false)
      }
   }, [])

   useEffect(() => {
      const galleryList: TGallery = [
         {
            src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${thumbnail}`,
            alt: name,
         },
      ]

      images.forEach((image) => {
         galleryList.push({
            src: `https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${image}`,
            alt: name,
         })
      })

      setGalleryList(galleryList)
   }, [thumbnail, images, name])

   return (
      <div className='space-y-3'>
         <div
            className='text-center bg-white rounded-xl shadow-lg shadow-slate-200 '
            onClick={() => {
               if (galleryList.length) {
                  setLightboxDynamicActive(true)
                  setLightboxOpen(true)
                  setCurrentIndex(0)
               }
            }}
         >
            {thumbnail ? (
               <Image
                  src={`https://tabrizian.storage.iran.liara.space/asadi_designs/designs/${thumbnail}`}
                  alt={thumbnail}
                  width={400}
                  height={400}
                  objectFit='cover'
                  priority
               />
            ) : (
               <span className='flex items-center justify-center text-xl py-1 font-medium text-rose-900'>
                  !تصویری یافت نشد
               </span>
            )}
         </div>

         <div className='flex space-x-3 justify-center'>
            {galleryList.map((data, idx) => {
               return (
                  <div
                     key={idx}
                     className='bg-white rounded-lg px-3 shadow-md'
                     onClick={() => {
                        if (galleryList.length) {
                           setLightboxOpen(true)
                           setCurrentIndex(idx)

                           console.log('lightboxOpen', lightboxOpen)
                           console.log('galleryList.length', galleryList.length)
                        }
                     }}
                  >
                     <Image
                        className='opacity-0 transition-opacity duration-300'
                        src={data.src}
                        alt={data.alt}
                        width={70}
                        height={70}
                        objectFit='cover'
                        loading='lazy'
                        onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                     />
                  </div>
               )
            })}
         </div>

         {lightboxDynamicActive && galleryList.length ? (
            <DynamicSlideshowLightbox
               theme='lightbox'
               lightboxIdentifier='lightbox1'
               framework='next'
               images={galleryList}
               showThumbnails={true}
               open={lightboxOpen}
               startingSlideIndex={currentImageIndex}
               modalClose='clickOutside'
               onClose={() => {
                  setLightboxOpen(false)
               }}
               iconColor={'white'}
               showSlideshowIcon={false}
               showThumbnailIcon={false}
            />
         ) : (
            ''
         )}
      </div>
   )
}

export default Images
